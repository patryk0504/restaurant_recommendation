FROM neo4j:4.4

MAINTAINER https://github.com/patryk0504

COPY --chown=neo4j neo4j.dump neo4j.dump
COPY --chown=neo4j mgt-entrypoint.sh mgt-entrypoint.sh
RUN chmod +x mgt-entrypoint.sh

ENV NEO4J_AUTH=neo4j/patryk0504
ENV NEO4J_dbms_security_auth__enabled=false
ENTRYPOINT ["./mgt-entrypoint.sh"]