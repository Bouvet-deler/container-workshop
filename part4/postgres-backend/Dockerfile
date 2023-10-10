FROM postgres

ENV POSTGRES_PASSWORD=pass
ENV POSTGRES_DB=todo

COPY to_do.sql /docker-entrypoint-initdb.d/

EXPOSE 5432