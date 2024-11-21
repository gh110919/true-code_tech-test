FROM oven/bun

WORKDIR /home/build/frontend
COPY . .

RUN bun i -g pm2
ARG arg_pm2_pk 
ARG arg_pm2_sk
ENV PM2_PUBLIC_KEY=${arg_pm2_pk}
ENV PM2_SECRET_KEY=${arg_pm2_sk}

RUN bun i 

EXPOSE 3000 4173

CMD ["pm2-runtime", "start", "ecosystem.config.cjs"]