FROM node:17.6.0
WORKDIR /app
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ADD . .
RUN npm install
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 5173
EXPOSE 8000
# CMD ["npm", "run", "dev"]