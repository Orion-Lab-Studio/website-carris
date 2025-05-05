# # #
# STAGE 1

# Make all nginx files available to the builder stage
# and generate cloudflare.conf with the setup script

FROM alpine AS builder

WORKDIR /app

COPY . .

RUN sh ./init-cloudflare-ips.sh
RUN mv ./cloudflare.conf ./configs/cloudflare.conf



# # #
# STAGE 2

# Use nginx:alpine-slim as base image and
# copy only the necessary files into the final image

FROM nginx:alpine-slim

WORKDIR /app

COPY --from=builder /app/configs /etc/nginx/

RUN cat /etc/nginx/cloudflare.conf

# # #
# Run Nginx	with auto-reload every 6 hours

CMD ["/bin/sh", "-c", "while :; do sleep 6h & wait ${!}; nginx -s reload; done & nginx -g 'daemon off;'"]
