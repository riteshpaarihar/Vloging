# Build Stage
FROM node:20 AS build
WORKDIR /app

# Only re-run npm install when dependencies change
COPY package*.json ./
RUN npm ci

# Now copy the rest of the files
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
