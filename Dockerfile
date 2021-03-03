FROM mhart/alpine-node:14

ENV dir /app

RUN mkdir -p ${dir}

WORKDIR ${dir}

COPY . ${dir}

RUN npm i

RUN npm run build

ENV NODE_ENV production

CMD ["node", "./builds/index.js"]
