
'use client';

/* * */

import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { RegularListItem } from '@/components/layout/RegularListItem';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { MapView } from '@/components/map/MapView';
import { useLinesContext } from '@/contexts/Lines.context';
import { transformStopDataIntoGeoJsonFeature, useStopsContext } from '@/contexts/Stops.context';
import { useVehiclesContext } from '@/contexts/Vehicles.context';
import { centerMap, getBaseGeoJsonFeatureCollection } from '@/utils/map.utils';
import { SegmentedControl } from '@mantine/core';
import { useMap } from '@vis.gl/react-maplibre';
import { useTranslations } from 'next-intl';
import { useQueryState } from 'nuqs';
import { useEffect, useMemo } from 'react';
import styles from './styles.module.css';

/* * */

// IDs das linhas que servem as praias da Arrábida
const ARRABIDA_LINE_IDS = [
    '4474', // Praia da Figueirinha, Albarquel
    '4414', // Albarquel 
    '4415', // Albarquel, ITS
    '4471', // Albarquel
    '4477', // Galápos, Galapinhos, Creiro
    '4470'  // Creiro, ITS
];

// Destinos e suas praias associadas
const ARRABIDA_DESTINATIONS = [
    {
        id: 'albarquel',
        name: 'Praia de Albarquel',
        lineIds: ['4474', '4414', '4415', '4471'],
        description: 'Praias de Albarquel com acesso pelas linhas 4474, 4414, 4415 e 4471'
    },
    {
        id: 'figueirinha',
        name: 'Praia da Figueirinha',
        lineIds: ['4474'],
        description: 'Praia da Figueirinha com acesso pela linha 4474'
    },
    {
        id: 'galapos',
        name: 'Praia dos Galápos',
        lineIds: ['4477'],
        description: 'Praias dos Galápos e Galapinhos com acesso pela linha 4477'
    },
    {
        id: 'creiro',
        name: 'Praia do Creiro',
        lineIds: ['4470', '4477'],
        description: 'Praia do Creiro com acesso pelas linhas 4470 e 4477'
    }
];

export function ArrabidaMap() {
    //
    // A. Setup variables

    const t = useTranslations('arrabida.ArrabidaMap');
    const linesContext = useLinesContext();
    const stopsContext = useStopsContext();
    const vehiclesContext = useVehiclesContext();

    const { arrabidaMap } = useMap();
    
    // URL state management
    const [viewMode, setViewMode] = useQueryState('view', { defaultValue: 'destinos' });
    const [selectedDestinationId, setSelectedDestinationId] = useQueryState('destination');
    const [selectedLineId, setSelectedLineId] = useQueryState('line');

    // Derived state - Linhas da Arrábida disponíveis
    const arrabidaLines = useMemo(() => {
        return ARRABIDA_LINE_IDS
            .map(id => linesContext.actions.getLineDataById(id))
            .filter(Boolean);
    }, [linesContext.data.lines]);

    // Filtrar itens baseado no modo de visualização
    const currentItems = useMemo(() => {
        if (viewMode === 'destinos') return ARRABIDA_DESTINATIONS;
        if (viewMode === 'linhas') return arrabidaLines.map(line => ({
            id: line.id,
            name: `${line.short_name} - ${line.long_name}`,
            description: `Linha ${line.short_name} da rede Arrábida`,
            lineData: line
        }));
        return [];
    }, [viewMode, arrabidaLines]);

    // Linhas selecionadas para mostrar no mapa
    const selectedLines = useMemo(() => {
        if (viewMode === 'destinos' && selectedDestinationId) {
            const destination = ARRABIDA_DESTINATIONS.find(d => d.id === selectedDestinationId);
            if (destination) {
                return destination.lineIds
                    .map(id => linesContext.actions.getLineDataById(id))
                    .filter(Boolean);
            }
        }
        if (viewMode === 'linhas' && selectedLineId) {
            const line = linesContext.actions.getLineDataById(selectedLineId);
            return line ? [line] : [];
        }
        return [];
    }, [viewMode, selectedDestinationId, selectedLineId, linesContext.data.lines]);

    // GeoJSON para veículos das linhas selecionadas
    const vehiclesFeatureCollection = useMemo(() => {
        if (!selectedLines.length) return;
        const collection = getBaseGeoJsonFeatureCollection();
        selectedLines.forEach(line => {
            const lineVehicles = vehiclesContext.actions.getVehiclesByLineIdGeoJsonFC(line.id);
            if (lineVehicles) {
                collection.features.push(...lineVehicles.features);
            }
        });
        return collection.features.length ? collection : undefined;
    }, [selectedLines, vehiclesContext.data.vehicles]);

    // GeoJSON para paradas das linhas selecionadas
    const stopsFeatureCollection = useMemo(() => {
        if (!selectedLines.length) return;
        const collection = getBaseGeoJsonFeatureCollection();
        const addedStops = new Set();
        
        selectedLines.forEach(line => {
            line.stop_ids?.forEach(stopId => {
                if (addedStops.has(stopId)) return;
                const stopData = stopsContext.actions.getStopById(stopId);
                if (!stopData) return;
                
                const feature = transformStopDataIntoGeoJsonFeature(stopData);
                feature.properties = {
                    ...feature.properties,
                    color: line.color,
                    text_color: line.text_color,
                };
                collection.features.push(feature);
                addedStops.add(stopId);
            });
        });
        
        return collection.features.length ? collection : undefined;
    }, [selectedLines, stopsContext.data.stops]);

    // Para simplificar, não vamos mostrar rotas por agora
    // As rotas requerem fetch de shapes específicos que é feito nos contextos de detalhe
    const pathsFeatureCollection = undefined;

    //
    // B. Handle actions

    const handleViewModeChange = (newMode: string) => {
        setViewMode(newMode);
        setSelectedDestinationId(null);
        setSelectedLineId(null);
    };

    const handleItemSelect = (item: any) => {
        if (viewMode === 'destinos') {
            setSelectedDestinationId(item.id);
            setSelectedLineId(null);
        } else if (viewMode === 'linhas') {
            setSelectedLineId(item.id);
            setSelectedDestinationId(null);
        }
    };

    const handleCenterMap = () => {
        if (!stopsFeatureCollection?.features.length) return;
        centerMap(arrabidaMap, stopsFeatureCollection.features, { padding: 60 });
    };

    // Auto-center map when stops change
    useEffect(() => {
        if (!arrabidaMap || !stopsFeatureCollection?.features.length) return;
        centerMap(arrabidaMap, stopsFeatureCollection.features, { padding: 60 });
    }, [arrabidaMap, stopsFeatureCollection]);

    //
    // C. Render components

    const currentSelection = viewMode === 'destinos' ? selectedDestinationId : selectedLineId;
    const selectedItem = currentItems.find(item => item.id === currentSelection);

    return (
        <div className={styles.container}>
            <Section>
                <Surface>
                    {/* Controls */}
                    <div className={styles.controls}>
                        <SegmentedControl
                            value={viewMode}
                            onChange={handleViewModeChange}
                            data={[
                                { label: 'Destinos', value: 'destinos' },
                                { label: 'Linhas', value: 'linhas' }
                            ]}
                            fullWidth
                        />
                    </div>

                    {/* Main content */}
                    <div className={styles.mainContent}>
                        {/* Left sidebar - Items list */}
                        <div className={styles.sidebar}>
                            <div className={styles.sidebarHeader}>
                                <h3>{viewMode === 'destinos' ? 'Destinos' : 'Linhas'}</h3>
                                <span className={styles.itemCount}>
                                    {currentItems.length} {currentItems.length === 1 ? 'item' : 'itens'}
                                </span>
                            </div>

                            {currentItems.length > 0 ? (
                                <div className={styles.itemsList}>
                                    {currentItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className={`${styles.listItem} ${selectedItem?.id === item.id ? styles.selectedItem : ''}`}
                                            onClick={() => handleItemSelect(item)}
                                        >
                                            <RegularListItem href="#" style={{ width: '100%', pointerEvents: 'none' }}>
                                                <div className={styles.itemContent}>
                                                    <div className={styles.itemInfo}>
                                                        <span className={styles.itemName}>{item.name}</span>
                                                        {item.description && (
                                                            <span className={styles.itemDescription}>
                                                                {item.description}
                                                            </span>
                                                        )}
                                                        {viewMode === 'destinos' && item.lineIds && (
                                                            <div className={styles.linesList}>
                                                                <span className={styles.linesLabel}>Linhas: </span>
                                                                {item.lineIds.map((lineId, index) => {
                                                                    const lineData = linesContext.actions.getLineDataById(lineId);
                                                                    return lineData ? (
                                                                        <span key={lineId} style={{ color: lineData.color }}>
                                                                            {lineData.short_name}
                                                                            {index < item.lineIds.length - 1 ? ', ' : ''}
                                                                        </span>
                                                                    ) : null;
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </RegularListItem>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <NoDataLabel />
                            )}
                        </div>

                        {/* Right content - Interactive Map */}
                        <div className={styles.mapSection}>
                            <MapView
                                id="arrabidaMap"
                                onCenterMap={handleCenterMap}
                            >
                                {/* Render vehicles */}
                                {/* {vehiclesFeatureCollection && (
                                    <MapViewStyleVehicles
                                        showCounter="always"
                                        vehiclesData={vehiclesFeatureCollection}
                                    />
                                )} */}

                                {/* Render stops */}
                                {/* {stopsFeatureCollection && (
                                    <MapViewStyleStops
                                        stopsData={stopsFeatureCollection}
                                    />
                                )} */}

                                {/* Render paths - Disabled for now as shapes require individual fetching */}
                                {/* {pathsFeatureCollection && (
                                    <MapViewStylePath
                                        shapeData={pathsFeatureCollection}
                                    />
                                )} */}
                            </MapView>

                            {/* Info overlay */}
                            {selectedItem && (
                                <div className={styles.mapInfo}>
                                    <div className={styles.mapInfoContent}>
                                        <h4>{selectedItem.name}</h4>
                                        <p>{selectedItem.description}</p>
                                        {selectedLines.length > 0 && (
                                            <div className={styles.activeLines}>
                                                <span>Linhas ativas: </span>
                                                {selectedLines.map((line, index) => (
                                                    <span key={line.id} style={{ color: line.color }}>
                                                        {line.short_name}
                                                        {index < selectedLines.length - 1 ? ', ' : ''}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Surface>
            </Section>
        </div>
    )
}   