#!/usr/bin/env sh

WAITFORIT_cmdname=${0##*/}

echoerr() { if [ "$WAITFORIT_QUIET" -ne 1 ]; then echo "$@" 1>&2; fi }

usage() {
    cat << USAGE >&2
Usage:
    $WAITFORIT_cmdname host:port [-s] [-t timeout] [-- command args]
USAGE
    exit 1
}

wait_for() {
    echoerr "$WAITFORIT_cmdname: waiting for $WAITFORIT_HOST:$WAITFORIT_PORT"
    while :; do
        (echo -n > /dev/tcp/$WAITFORIT_HOST/$WAITFORIT_PORT) >/dev/null 2>&1
        WAITFORIT_result=$?
        if [ $WAITFORIT_result -eq 0 ]; then
            echoerr "$WAITFORIT_cmdname: $WAITFORIT_HOST:$WAITFORIT_PORT is available"
            break
        fi
        sleep 1
    done
    return $WAITFORIT_result
}
