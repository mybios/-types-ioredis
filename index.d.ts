// Type definitions for ioredis
// Project: https://github.com/luin/ioredis
// Definitions by: York Yao <https://github.com/plantain-00/>
//                 Christopher Eck <https://github.com/chrisleck>
//                 Yoga Aliarham <https://github.com/aliarham11>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

/* =================== USAGE ===================
    import * as Redis from "ioredis";
    var redis = new Redis();
 =============================================== */

/// <reference types="node" />

interface RedisStatic
{
    new(port?: number, host?: string, options?: IORedis.RedisOptions): IORedis.Redis;
    new(host?: string, options?: IORedis.RedisOptions): IORedis.Redis;
    new(options: IORedis.RedisOptions): IORedis.Redis;
    new(url: string): IORedis.Redis;
    (port?: number, host?: string, options?: IORedis.RedisOptions): IORedis.Redis;
    (host?: string, options?: IORedis.RedisOptions): IORedis.Redis;
    (options: IORedis.RedisOptions): IORedis.Redis;
    (url: string): IORedis.Redis;
    Cluster: IORedis.Cluster;
}

declare var IORedis: RedisStatic;
export = IORedis;

declare module IORedis
{
    interface Commander
    {
        new(): Commander;
        getBuiltinCommands(): string[];
        createBuiltinCommand(commandName: string): {};
        defineCommand(name: string, definition: {
            numberOfKeys?: number;
            lua?: string;
        }): any;
        sendCommand(): void;
    }

    export type Callback<T> = (err: Error | null, reply: T) => void;

    export interface ServerInfo
    {
        redis_version: string;
        versions: number[];
    }

    export interface OverloadedCommand<T, U, R>
    {
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T): Promise<U>;
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T): Promise<U>;
        (arg1: T, arg2: T, arg3: T, arg4: T): Promise<U>;
        (arg1: T, arg2: T, arg3: T): Promise<U>;
        (arg1: T, arg2: T | T[]): Promise<U>;
        (arg1: T | T[]): Promise<U>;
        (...args: Array<T | Callback<U>>): R;
    }

    export interface OverloadedKeyCommand<T, U, R>
    {
        (key: string, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T): Promise<U>;
        (key: string, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T): Promise<U>;
        (key: string, arg1: T, arg2: T, arg3: T, arg4: T): Promise<U>;
        (key: string, arg1: T, arg2: T, arg3: T): Promise<U>;
        (key: string, arg1: T, arg2: T): Promise<U>;
        (key: string, arg1: T | T[]): Promise<U>;
        (key: string, ...args: Array<T | Callback<U>>): R;
        (...args: Array<string | T | Callback<U>>): R;
    }

    export interface OverloadedListCommand<T, U, R>
    {
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T): Promise<U>;
        (arg1: T, arg2: T, arg3: T, arg4: T, arg5: T): Promise<U>;
        (arg1: T, arg2: T, arg3: T, arg4: T): Promise<U>;
        (arg1: T, arg2: T, arg3: T): Promise<U>;
        (arg1: T, arg2: T): Promise<U>;
        (arg1: T | T[]): Promise<U>;
        (...args: Array<T | Callback<U>>): R;
    }

    export interface OverloadedSetCommand<T, U, R>
    {
        (key: string, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T, arg6: T): Promise<U>;
        (key: string, arg1: T, arg2: T, arg3: T, arg4: T, arg5: T): Promise<U>;
        (key: string, arg1: T, arg2: T, arg3: T, arg4: T): Promise<U>;
        (key: string, arg1: T, arg2: T, arg3: T): Promise<U>;
        (key: string, arg1: T, arg2: T): Promise<U>;
        (key: string, arg1: T | { [key: string]: T } | T[]): Promise<U>;
        (key: string, ...args: Array<T | Callback<U>>): R;
    }

    export interface OverloadedLastCommand<T1, T2, U, R>
    {
        (arg1: T1, arg2: T1, arg3: T1, arg4: T1, arg5: T1, arg6: T2): Promise<U>;
        (arg1: T1, arg2: T1, arg3: T1, arg4: T1, arg5: T2): Promise<U>;
        (arg1: T1, arg2: T1, arg3: T1, arg4: T2): Promise<U>;
        (arg1: T1, arg2: T1, arg3: T2): Promise<U>;
        (arg1: T1, arg2: T2 | Array<T1 | T2>): Promise<U>;
        (args: Array<T1 | T2>): Promise<U>;
        (...args: Array<T1 | T2 | Callback<U>>): R;
    }

    export interface Commands<R>
    {
        /**
         * Listen for all requests received by the server in real time.
         */
        monitor(): Promise<undefined>;

        /**
         * Get information and statistics about the server.
         */
        info(): Promise<ServerInfo>;
        info(section?: string | string[]): Promise<ServerInfo>;

        /**
         * Ping the server.
         */
        ping(): Promise<string>;
        ping(message: string): Promise<string>

        /**
         * Post a message to a channel.
         */
        publish(channel: string, value: string): Promise<number>;

        /**
         * Authenticate to the server.
         */
        auth(password: string): Promise<string>;

        /**
         * KILL - Kill the connection of a client.
         * LIST - Get the list of client connections.
         * GETNAME - Get the current connection name.
         * PAUSE - Stop processing commands from clients for some time.
         * REPLY - Instruct the server whether to reply to commands.
         * SETNAME - Set the current connection name.
         */
        client: OverloadedCommand<string, any, R>;

        /**
         * Set multiple hash fields to multiple values.
         */
        hmset: OverloadedSetCommand<string | number, boolean, R>;

        /**
         * Listen for messages published to the given channels.
         */
        subscribe: OverloadedListCommand<string, string, R>;

        /**
         * Stop listening for messages posted to the given channels.
         */
        unsubscribe: OverloadedListCommand<string, string, R>;

        /**
         * Listen for messages published to channels matching the given patterns.
         */
        psubscribe: OverloadedListCommand<string, string, R>;

        /**
         * Stop listening for messages posted to channels matching the given patterns.
         */
        punsubscribe: OverloadedListCommand<string, string, R>;

        /**
         * Append a value to a key.
         */
        append(key: string, value: string): Promise<number>;

        /**
         * Asynchronously rewrite the append-only file.
         */
        bgrewriteaof(): Promise<'OK'>;

        /**
         * Asynchronously save the dataset to disk.
         */
        bgsave(): Promise<string>;

        /**
         * Count set bits in a string.
         */
        bitcount(key: string): Promise<number>;
        bitcount(key: string, start: number, end: number): Promise<number>;

        /**
         * Perform arbitrary bitfield integer operations on strings.
         */
        bitfield: OverloadedKeyCommand<string | number, [number, number], R>;

        /**
         * Perform bitwise operations between strings.
         */
        bitop(operation: string, destkey: string, key1: string, key2: string, key3: string): Promise<number>;
        bitop(operation: string, destkey: string, key1: string, key2: string): Promise<number>;
        bitop(operation: string, destkey: string, key: string): Promise<number>;
        bitop(operation: string, destkey: string, ...args: Array<string | Callback<number>>): R;

        /**
         * Find first bit set or clear in a string.
         */
        bitpos(key: string, bit: number, start: number, end: number): Promise<number>;
        bitpos(key: string, bit: number, start: number): Promise<number>;
        bitpos(key: string, bit: number): Promise<number>;

        /**
         * Remove and get the first element in a list, or block until one is available.
         */
        blpop: OverloadedLastCommand<string, number, [string, string], R>;

        /**
         * Remove and get the last element in a list, or block until one is available.
         */
        brpop: OverloadedLastCommand<string, number, [string, string], R>;

        /**
         * Pop a value from a list, push it to another list and return it; or block until one is available.
         */
        brpoplpush(source: string, destination: string, timeout: number): Promise<[string, string]>;

        /**
         * ADDSLOTS - Assign new hash slots to receiving node.
         * COUNT-FAILURE-REPORTS - Return the number of failure reports active for a given node.
         * COUNTKEYSINSLOT - Return the number of local keys in the specified hash slot.
         * DELSLOTS - Set hash slots as unbound in receiving node.
         * FAILOVER - Forces a slave to perform a manual failover of its master.
         * FORGET - Remove a node from the nodes table.
         * GETKEYSINSLOT - Return local key names in the specified hash slot.
         * INFO - Provides info about Redis Cluster node state.
         * KEYSLOT - Returns the hash slot of the specified key.
         * MEET - Force a node cluster to handshake with another node.
         * NODES - Get cluster config for the node.
         * REPLICATE - Reconfigure a node as a slave of the specified master node.
         * RESET - Reset a Redis Cluster node.
         * SAVECONFIG - Forces the node to save cluster state on disk.
         * SET-CONFIG-EPOCH - Set the configuration epoch in a new node.
         * SETSLOT - Bind a hash slot to a specified node.
         * SLAVES - List slave nodes of the specified master node.
         * SLOTS - Get array of Cluster slot to node mappings.
         */
        cluster: OverloadedCommand<string, any, this>;

        /**
         * Get array of Redis command details.
         *
         * COUNT - Get total number of Redis commands.
         * GETKEYS - Extract keys given a full Redis command.
         * INFO - Get array of specific REdis command details.
         */
        command(): Promise<Array<[string, number, string[], number, number, number]>>;

        /**
         * Get array of Redis command details.
         *
         * COUNT - Get array of Redis command details.
         * GETKEYS - Extract keys given a full Redis command.
         * INFO - Get array of specific Redis command details.
         * GET - Get the value of a configuration parameter.
         * REWRITE - Rewrite the configuration file with the in memory configuration.
         * SET - Set a configuration parameter to the given value.
         * RESETSTAT - Reset the stats returned by INFO.
         */
        config: OverloadedCommand<string, boolean, R>;

        /**
         * Return the number of keys in the selected database.
         */
        dbsize(): Promise<number>;

        /**
         * OBJECT - Get debugging information about a key.
         * SEGFAULT - Make the server crash.
         */
        debug: OverloadedCommand<string, boolean, R>;

        /**
         * Decrement the integer value of a key by one.
         */
        decr(key: string): Promise<number>;

        /**
         * Decrement the integer value of a key by the given number.
         */
        decrby(key: string, decrement: number): Promise<number>;

        /**
         * Delete a key.
         */
        del: OverloadedCommand<string, number, R>;

        /**
         * Discard all commands issued after MULTI.
         */
        discard(): Promise<'OK'>;

        /**
         * Return a serialized version of the value stored at the specified key.
         */
        dump(key: string): Promise<string>;

        /**
         * Echo the given string.
         */
        echo<T extends string>(message: T): Promise<T>;

        /**
         * Execute a Lua script server side.
         */
        eval: OverloadedCommand<string | number, any, R>;

        /**
         * Execute a Lue script server side.
         */
        evalsha: OverloadedCommand<string | number, any, R>;

        /**
         * Determine if a key exists.
         */
        exists: OverloadedCommand<string, number, R>;

        /**
         * Set a key's time to live in seconds.
         */
        expire(key: string, seconds: number): Promise<number>;

        /**
         * Set the expiration for a key as a UNIX timestamp.
         */
        expireat(key: string, timestamp: number): Promise<number>;

        /**
         * Remove all keys from all databases.
         */
        flushall(): Promise<string>;

        /**
         * Remove all keys from the current database.
         */
        flushdb(): Promise<string>;

        /**
         * Add one or more geospatial items in the geospatial index represented using a sorted set.
         */
        geoadd: OverloadedKeyCommand<string | number, number, R>;

        /**
         * Returns members of a geospatial index as standard geohash strings.
         */
        geohash: OverloadedKeyCommand<string, string, R>;

        /**
         * Returns longitude and latitude of members of a geospatial index.
         */
        geopos: OverloadedKeyCommand<string, Array<[number, number]>, R>;

        /**
         * Returns the distance between two members of a geospatial index.
         */
        geodist: OverloadedKeyCommand<string, string, R>;

        /**
         * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a point.
         */
        georadius: OverloadedKeyCommand<string | number, Array<string | [string, string | [string, string]]>, R>;

        /**
         * Query a sorted set representing a geospatial index to fetch members matching a given maximum distance from a member.
         */
        georadiusbymember: OverloadedKeyCommand<string | number, Array<string | [string, string | [string, string]]>, R>;

        /**
         * Get the value of a key.
         */
        get(key: string): Promise<string>;

        /**
         * Returns the bit value at offset in the string value stored at key.
         */
        getbit(key: string, offset: number): Promise<number>;

        /**
         * Get a substring of the string stored at a key.
         */
        getrange(key: string, start: number, end: number): Promise<string>;

        /**
         * Set the string value of a key and return its old value.
         */
        getset(key: string, value: string): Promise<string>;

        /**
         * Delete on or more hash fields.
         */
        hdel: OverloadedKeyCommand<string, number, R>;

        /**
         * Determine if a hash field exists.
         */
        hexists(key: string, field: string): Promise<number>;

        /**
         * Get the value of a hash field.
         */
        hget(key: string, field: string): Promise<string>;

        /**
         * Get all fields and values in a hash.
         */
        hgetall(key: string): Promise<{ [key: string]: string }>;

        /**
         * Increment the integer value of a hash field by the given number.
         */
        hincrby(key: string, field: string, increment: number): Promise<number>;

        /**
         * Increment the float value of a hash field by the given amount.
         */
        hincrbyfloat(key: string, field: string, increment: number): Promise<number>;

        /**
         * Get all the fields of a hash.
         */
        hkeys(key: string): Promise<string[]>;

        /**
         * Get the number of fields in a hash.
         */
        hlen(key: string): Promise<number>;

        /**
         * Get the values of all the given hash fields.
         */
        hmget: OverloadedKeyCommand<string, string[], R>;

        /**
         * Set the string value of a hash field.
         */
        hset(key: string, field: string, value: string): Promise<number>;

        /**
         * Set the value of a hash field, only if the field does not exist.
         */
        hsetnx(key: string, field: string, value: string): Promise<number>;

        /**
         * Get the length of the value of a hash field.
         */
        hstrlen(key: string, field: string): Promise<number>;

        /**
         * Get all the values of a hash.
         */
        hvals(key: string): Promise<string[]>;

        /**
         * Increment the integer value of a key by one.
         */
        incr(key: string): Promise<number>;

        /**
         * Increment the integer value of a key by the given amount.
         */
        incrby(key: string, increment: number): Promise<number>;

        /**
         * Increment the float value of a key by the given amount.
         */
        incrbyfloat(key: string, increment: number): Promise<number>;

        /**
         * Find all keys matching the given pattern.
         */
        keys(pattern: string): Promise<string[]>;

        /**
         * Get the UNIX time stamp of the last successful save to disk.
         */
        lastsave(): Promise<number>;

        /**
         * Get an element from a list by its index.
         */
        lindex(key: string, index: number): Promise<string>;

        /**
         * Insert an element before or after another element in a list.
         */
        linsert(key: string, dir: 'BEFORE' | 'AFTER', pivot: string, value: string): Promise<string>;

        /**
         * Get the length of a list.
         */
        llen(key: string): Promise<number>;

        /**
         * Remove and get the first element in a list.
         */
        lpop(key: string): Promise<string>;

        /**
         * Prepend one or multiple values to a list.
         */
        lpush: OverloadedKeyCommand<string, number, R>;

        /**
         * Prepend a value to a list, only if the list exists.
         */
        lpushx(key: string, value: string): Promise<number>;

        /**
         * Get a range of elements from a list.
         */
        lrange(key: string, start: number, stop: number): Promise<string[]>;

        /**
         * Remove elements from a list.
         */
        lrem(key: string, count: number, value: string): Promise<number>;

        /**
         * Set the value of an element in a list by its index.
         */
        lset(key: string, index: number, value: string): Promise<'OK'>;

        /**
         * Trim a list to the specified range.
         */
        ltrim(key: string, start: number, stop: number): Promise<'OK'>;

        /**
         * Get the values of all given keys.
         */
        mget: OverloadedCommand<string, string[], R>;

        /**
         * Atomically tranfer a key from a Redis instance to another one.
         */
        migrate: OverloadedCommand<string, boolean, R>;

        /**
         * Move a key to another database.
         */
        move(key: string, db: string | number): R;

        /**
         * Set multiple keys to multiple values.
         */
        mset: OverloadedCommand<string, boolean, R>;

        /**
         * Set multiple keys to multiple values, only if none of the keys exist.
         */
        msetnx: OverloadedCommand<string, boolean, R>;

        /**
         * Inspect the internals of Redis objects.
         */
        object: OverloadedCommand<string, any, R>;

        /**
         * Remove the expiration from a key.
         */
        persist(key: string): Promise<number>;

        /**
         * Remove a key's time to live in milliseconds.
         */
        pexpire(key: string, milliseconds: number): Promise<number>;

        /**
         * Set the expiration for a key as a UNIX timestamp specified in milliseconds.
         */
        pexpireat(key: string, millisecondsTimestamp: number): Promise<number>;

        /**
         * Adds the specified elements to the specified HyperLogLog.
         */
        pfadd: OverloadedKeyCommand<string, number, R>;

        /**
         * Return the approximated cardinality of the set(s) observed by the HyperLogLog at key(s).
         */
        pfcount: OverloadedCommand<string, number, R>;

        /**
         * Merge N different HyperLogLogs into a single one.
         */
        pfmerge: OverloadedCommand<string, boolean, R>;

        /**
         * Set the value and expiration in milliseconds of a key.
         */
        psetex(key: string, milliseconds: number, value: string): Promise<'OK'>;

        /**
         * Inspect the state of the Pub/Sub subsytem.
         */
        pubsub: OverloadedCommand<string, number, R>;

        /**
         * Get the time to live for a key in milliseconds.
         */
        pttl(key: string): Promise<number>;

        /**
         * Close the connection.
         */
        quit(): Promise<'OK'>;

        /**
         * Return a random key from the keyspace.
         */
        randomkey(): Promise<string>;

        /**
         * Enables read queries for a connection to a cluster slave node.
         */
        readonly(): Promise<string>;

        /**
         * Disables read queries for a connection to cluster slave node.
         */
        readwrite(): Promise<string>;

        /**
         * Rename a key.
         */
        rename(key: string, newkey: string): Promise<'OK'>;

        /**
         * Rename a key, only if the new key does not exist.
         */
        renamenx(key: string, newkey: string): Promise<number>;

        /**
         * Create a key using the provided serialized value, previously obtained using DUMP.
         */
        restore(key: string, ttl: number, serializedValue: string): Promise<'OK'>;

        /**
         * Return the role of the instance in the context of replication.
         */
        role(): Promise<[string, number, Array<[string, string, string]>]>;

        /**
         * Remove and get the last element in a list.
         */
        rpop(key: string): Promise<string>;

        /**
         * Remove the last element in a list, prepend it to another list and return it.
         */
        rpoplpush(source: string, destination: string): Promise<string>;

        /**
         * Append one or multiple values to a list.
         */
        rpush: OverloadedKeyCommand<string, number, R>;

        /**
         * Append a value to a list, only if the list exists.
         */
        rpushx(key: string, value: string): Promise<number>;

        /**
         * Append one or multiple members to a set.
         */
        sadd: OverloadedKeyCommand<string, number, R>;

        /**
         * Synchronously save the dataset to disk.
         */
        save(): Promise<string>;

        /**
         * Get the number of members in a set.
         */
        scard(key: string): Promise<number>;

        /**
         * DEBUG - Set the debug mode for executed scripts.
         * EXISTS - Check existence of scripts in the script cache.
         * FLUSH - Remove all scripts from the script cache.
         * KILL - Kill the script currently in execution.
         * LOAD - Load the specified Lua script into the script cache.
         */
        script: OverloadedCommand<string, any, R>;

        /**
         * Subtract multiple sets.
         */
        sdiff: OverloadedCommand<string, string[], R>;

        /**
         * Subtract multiple sets and store the resulting set in a key.
         */
        sdiffstore: OverloadedKeyCommand<string, number, R>;

        /**
         * Change the selected database for the current connection.
         */
        select(index: number | string): Promise<string>;

        /**
         * Set the string value of a key.
         */
        set(key: string, value: string): Promise<'OK'>;
        set(key: string, value: string, flag: "NX" | "XX"): Promise<'OK'>;
        set(key: string, value: string, mode: "EX" | "PX", duration: number): Promise<'OK' | undefined>;
        set(key: string, value: string, mode: "EX" | "PX", duration: number, flag: "NX" | "XX"): Promise<'OK' | undefined>;

        /**
         * Sets or clears the bit at offset in the string value stored at key.
         */
        setbit(key: string, offset: number, value: string): Promise<number>;

        /**
         * Set the value and expiration of a key.
         */
        setex(key: string, seconds: number, value: string): Promise<string>;

        /**
         * Set the value of a key, only if the key does not exist.
         */
        setnx(key: string, value: string): Promise<number>;

        /**
         * Overwrite part of a string at key starting at the specified offset.
         */
        setrange(key: string, offset: number, value: string): Promise<number>;

        /**
         * Synchronously save the dataset to disk and then shut down the server.
         */
        shutdown: OverloadedCommand<string, string, R>;

        /**
         * Intersect multiple sets.
         */
        sinter: OverloadedKeyCommand<string, string[], R>;

        /**
         * Intersect multiple sets and store the resulting set in a key.
         */
        sinterstore: OverloadedCommand<string, number, R>;

        /**
         * Determine if a given value is a member of a set.
         */
        sismember(key: string, member: string): Promise<number>;

        /**
         * Make the server a slave of another instance, or promote it as master.
         */
        slaveof(host: string, port: string | number): Promise<string>;

        /**
         * Manages the Redis slow queries log.
         */
        slowlog: OverloadedCommand<string, Array<[number, number, number, string[]]>, R>;

        /**
         * Get all the members in a set.
         */
        smembers(key: string): Promise<string[]>;

        /**
         * Move a member from one set to another.
         */
        smove(source: string, destination: string, member: string): Promise<number>;

        /**
         * Sort the elements in a list, set or sorted set.
         */
        sort: OverloadedCommand<string, string[], R>;

        /**
         * Remove and return one or multiple random members from a set.
         */
        spop(key: string): Promise<string>;
        spop(key: string, count: number): Promise<string[]>;

        /**
         * Get one or multiple random members from a set.
         */
        srandmember(key: string): Promise<string>;
        srandmember(key: string, count: number): Promise<string[]>;

        /**
         * Remove one or more members from a set.
         */
        srem: OverloadedKeyCommand<string, number, R>;

        /**
         * Get the length of the value stored in a key.
         */
        strlen(key: string): Promise<number>;

        /**
         * Add multiple sets.
         */
        sunion: OverloadedCommand<string, string[], R>;

        /**
         * Add multiple sets and store the resulting set in a key.
         */
        sunionstore: OverloadedCommand<string, number, R>;

        /**
         * Internal command used for replication.
         */
        sync(): Promise<undefined>;

        /**
         * Return the current server time.
         */
        time(): Promise<[string, string]>;

        /**
         * Get the time to live for a key.
         */
        ttl(key: string): Promise<number>;

        /**
         * Determine the type stored at key.
         */
        type(key: string): Promise<string>;

        /**
         * Forget about all watched keys.
         */
        unwatch(): Promise<'OK'>;

        /**
         * Wait for the synchronous replication of all the write commands sent in the context of the current connection.
         */
        wait(numslaves: number, timeout: number): Promise<number>;

        /**
         * Watch the given keys to determine execution of the MULTI/EXEC block.
         */
        watch: OverloadedCommand<string, 'OK', R>;

        /**
         * Add one or more members to a sorted set, or update its score if it already exists.
         */
        zadd: OverloadedKeyCommand<string | number, number, R>;

        /**
         * Get the number of members in a sorted set.
         */
        zcard(key: string): Promise<number>;

        /**
         * Count the members in a sorted set with scores between the given values.
         */
        zcount(key: string, min: number | string, max: number | string): Promise<number>;

        /**
         * Increment the score of a member in a sorted set.
         */
        zincrby(key: string, increment: number, member: string): Promise<number>;

        /**
         * Intersect multiple sorted sets and store the resulting sorted set in a new key.
         */
        zinterstore: OverloadedCommand<string | number, number, R>;

        /**
         * Count the number of members in a sorted set between a given lexicographic range.
         */
        zlexcount(key: string, min: string, max: string): Promise<number>;

        /**
         * Return a range of members in a sorted set, by index.
         */
        zrange(key: string, start: number, stop: number): Promise<string[]>;
        zrange(key: string, start: number, stop: number, withscores: string): Promise<string[]>;

        /**
         * Return a range of members in a sorted set, by lexicographical range.
         */
        zrangebylex(key: string, min: string, max: string): Promise<string[]>;
        zrangebylex(key: string, min: string, max: string, limit: string, offset: number, count: number): Promise<string[]>;

        /**
         * Return a range of members in a sorted set, by lexicographical range, ordered from higher to lower strings.
         */
        zrevrangebylex(key: string, min: string, max: string): Promise<string[]>;
        zrevrangebylex(key: string, min: string, max: string, limit: string, offset: number, count: number): Promise<string[]>;

        /**
         * Return a range of members in a sorted set, by score.
         */
        zrangebyscore(key: string, min: number | string, max: number | string): Promise<string[]>;
        zrangebyscore(key: string, min: number | string, max: number | string, withscores: string): Promise<string[]>;
        zrangebyscore(key: string, min: number | string, max: number | string, limit: string, offset: number, count: number): Promise<string[]>;
        zrangebyscore(key: string, min: number | string, max: number | string, withscores: string, limit: string, offset: number, count: number): Promise<string[]>;

        /**
         * Determine the index of a member in a sorted set.
         */
        zrank(key: string, member: string): Promise<number | undefined>;

        /**
         * Remove one or more members from a sorted set.
         */
        zrem: OverloadedKeyCommand<string, number, R>;

        /**
         * Remove all members in a sorted set between the given lexicographical range.
         */
        zremrangebylex(key: string, min: string, max: string): Promise<number>;

        /**
         * Remove all members in a sorted set within the given indexes.
         */
        zremrangebyrank(key: string, start: number, stop: number): Promise<number>;

        /**
         * Remove all members in a sorted set within the given indexes.
         */
        zremrangebyscore(key: string, min: string | number, max: string | number): Promise<number>;

        /**
         * Return a range of members in a sorted set, by index, with scores ordered from high to low.
         */
        zrevrange(key: string, start: number, stop: number): Promise<string[]>;
        zrevrange(key: string, start: number, stop: number, withscores: string): Promise<string[]>;

        /**
         * Return a range of members in a sorted set, by score, with scores ordered from high to low.
         */
        zrevrangebyscore(key: string, min: number | string, max: number | string): Promise<string[]>;
        zrevrangebyscore(key: string, min: number | string, max: number | string, withscores: string): Promise<string[]>;
        zrevrangebyscore(key: string, min: number | string, max: number | string, limit: string, offset: number, count: number): Promise<string[]>;
        zrevrangebyscore(key: string, min: number | string, max: number | string, withscores: string, limit: string, offset: number, count: number): Promise<string[]>;

        /**
         * Determine the index of a member in a sorted set, with scores ordered from high to low.
         */
        zrevrank(key: string, member: string): Promise<number | undefined>;

        /**
         * Get the score associated with the given member in a sorted set.
         */
        zscore(key: string, member: string): Promise<string>;

        /**
         * Add multiple sorted sets and store the resulting sorted set in a new key.
         */
        zunionstore: OverloadedCommand<string | number, number, R>;

        /**
         * Incrementally iterate the keys space.
         */
        scan: OverloadedCommand<string, [string, string[]], R>;

        /**
         * Incrementally iterate Set elements.
         */
        sscan: OverloadedKeyCommand<string, [string, string[]], R>;

        /**
         * Incrementally iterate hash fields and associated values.
         */
        hscan: OverloadedKeyCommand<string, [string, string[]], R>;

        /**
         * Incrementally iterate sorted sets elements and associated scores.
         */
        zscan: OverloadedKeyCommand<string, [string, string[]], R>;
    }

    interface Redis extends Commands<boolean>, NodeJS.EventEmitter, Commander
    {
        status: string;
        connect(callback?: Function): Promise<any>;
        disconnect(): void;
        duplicate(): Redis;

        multi(args: any[], callback?: ResCallbackT<any>): Pipeline;
        multi(...args: any[]): Pipeline;

        /*      monitor(calback: (error: Error, monitor: NodeJS.EventEmitter) => void): Promise<NodeJS.EventEmitter>;
      
              send_command(command: string, ...args: any[]): any;
              auth(password: string, callback?: ResCallbackT<any>): any;
              ping(callback?: ResCallbackT<number>): any;
              append(key: string, value: string, callback?: ResCallbackT<number>): any;
              bitcount(key: string, callback?: ResCallbackT<number>): any;
              bitcount(key: string, start: number, end: number, callback?: ResCallbackT<number>): any;
              set(key: string, value: string, callback?: ResCallbackT<string>): any;
              get(key: string, callback?: ResCallbackT<string>): any;
              exists(key: string, value: string, callback?: ResCallbackT<number>): any;
              publish(channel: string, value: any): any;
              subscribe(channel: string): any;
              get(args: any[], callback?: ResCallbackT<string>): any;
              get(...args: any[]): any;
              getBuffer(key: string, callback?: ResCallbackT<Buffer>): any;
              set(args: any[], callback?: ResCallbackT<string>): any;
              set(...args: any[]): any;
              setnx(args: any[], callback?: ResCallbackT<any>): any;
              setnx(...args: any[]): any;
              setex(args: any[], callback?: ResCallbackT<any>): any;
              setex(...args: any[]): any;
              psetex(args: any[], callback?: ResCallbackT<any>): any;
              psetex(...args: any[]): any;
              append(args: any[], callback?: ResCallbackT<any>): any;
              append(...args: any[]): any;
              strlen(args: any[], callback?: ResCallbackT<any>): any;
              strlen(...args: any[]): any;
              del(args: any[], callback?: ResCallbackT<any>): any;
              del(...args: any[]): any;
              exists(args: any[], callback?: ResCallbackT<any>): any;
              exists(...args: any[]): any;
              setbit(args: any[], callback?: ResCallbackT<any>): any;
              setbit(...args: any[]): any;
              getbit(args: any[], callback?: ResCallbackT<any>): any;
              getbit(...args: any[]): any;
              setrange(args: any[], callback?: ResCallbackT<any>): any;
              setrange(...args: any[]): any;
              getrange(args: any[], callback?: ResCallbackT<any>): any;
              getrange(...args: any[]): any;
              substr(args: any[], callback?: ResCallbackT<any>): any;
              substr(...args: any[]): any;
              incr(args: any[], callback?: ResCallbackT<any>): any;
              incr(...args: any[]): any;
              decr(args: any[], callback?: ResCallbackT<any>): any;
              decr(...args: any[]): any;
              mget(args: any[], callback?: ResCallbackT<any>): any;
              mget(...args: any[]): any;
              rpush(...args: any[]): any;
              lpush(args: any[], callback?: ResCallbackT<any>): any;
              lpush(...args: any[]): any;
              rpushx(args: any[], callback?: ResCallbackT<any>): any;
              rpushx(...args: any[]): any;
              lpushx(args: any[], callback?: ResCallbackT<any>): any;
              lpushx(...args: any[]): any;
              linsert(args: any[], callback?: ResCallbackT<any>): any;
              linsert(...args: any[]): any;
              rpop(args: any[], callback?: ResCallbackT<any>): any;
              rpop(...args: any[]): any;
              lpop(args: any[], callback?: ResCallbackT<any>): any;
              lpop(...args: any[]): any;
              brpop(args: any[], callback?: ResCallbackT<any>): any;
              brpop(...args: any[]): any;
              brpoplpush(args: any[], callback?: ResCallbackT<any>): any;
              brpoplpush(...args: any[]): any;
              blpop(args: any[], callback?: ResCallbackT<any>): any;
              blpop(...args: any[]): any;
              llen(args: any[], callback?: ResCallbackT<any>): any;
              llen(...args: any[]): any;
              lindex(args: any[], callback?: ResCallbackT<any>): any;
              lindex(...args: any[]): any;
              lset(args: any[], callback?: ResCallbackT<any>): any;
              lset(...args: any[]): any;
              lrange(args: any[], callback?: ResCallbackT<any>): any;
              lrange(...args: any[]): any;
              ltrim(args: any[], callback?: ResCallbackT<any>): any;
              ltrim(...args: any[]): any;
              lrem(args: any[], callback?: ResCallbackT<any>): any;
              lrem(...args: any[]): any;
              rpoplpush(args: any[], callback?: ResCallbackT<any>): any;
              rpoplpush(...args: any[]): any;
              sadd(args: any[], callback?: ResCallbackT<any>): any;
              sadd(...args: any[]): any;
              srem(args: any[], callback?: ResCallbackT<any>): any;
              srem(...args: any[]): any;
              smove(args: any[], callback?: ResCallbackT<any>): any;
              smove(...args: any[]): any;
              sismember(args: any[], callback?: ResCallbackT<any>): any;
              sismember(...args: any[]): any;
              scard(args: any[], callback?: ResCallbackT<any>): any;
              scard(...args: any[]): any;
              spop(args: any[], callback?: ResCallbackT<any>): any;
              spop(...args: any[]): any;
              srandmember(args: any[], callback?: ResCallbackT<any>): any;
              srandmember(...args: any[]): any;
              sinter(args: any[], callback?: ResCallbackT<any>): any;
              sinter(...args: any[]): any;
              sinterstore(args: any[], callback?: ResCallbackT<any>): any;
              sinterstore(...args: any[]): any;
              sunion(args: any[], callback?: ResCallbackT<any>): any;
              sunion(...args: any[]): any;
              sunionstore(args: any[], callback?: ResCallbackT<any>): any;
              sunionstore(...args: any[]): any;
              sdiff(args: any[], callback?: ResCallbackT<any>): any;
              sdiff(...args: any[]): any;
              sdiffstore(args: any[], callback?: ResCallbackT<any>): any;
              sdiffstore(...args: any[]): any;
              smembers(args: any[], callback?: ResCallbackT<any>): any;
              smembers(...args: any[]): any;
              zadd(args: any[], callback?: ResCallbackT<any>): any;
              zadd(...args: any[]): any;
              zincrby(args: any[], callback?: ResCallbackT<any>): any;
              zincrby(...args: any[]): any;
              zrem(args: any[], callback?: ResCallbackT<any>): any;
              zrem(...args: any[]): any;
              zremrangebyscore(args: any[], callback?: ResCallbackT<any>): any;
              zremrangebyscore(...args: any[]): any;
              zremrangebyrank(args: any[], callback?: ResCallbackT<any>): any;
              zremrangebyrank(...args: any[]): any;
              zunionstore(args: any[], callback?: ResCallbackT<any>): any;
              zunionstore(...args: any[]): any;
              zinterstore(args: any[], callback?: ResCallbackT<any>): any;
              zinterstore(...args: any[]): any;
              zrange(args: any[], callback?: ResCallbackT<any>): any;
              zrange(...args: any[]): any;
              zrangebyscore(args: any[], callback?: ResCallbackT<any>): any;
              zrangebyscore(...args: any[]): any;
              zrevrangebyscore(args: any[], callback?: ResCallbackT<any>): any;
              zrevrangebyscore(...args: any[]): any;
              zcount(args: any[], callback?: ResCallbackT<any>): any;
              zcount(...args: any[]): any;
              zrevrange(args: any[], callback?: ResCallbackT<any>): any;
              zrevrange(...args: any[]): any;
              zcard(args: any[], callback?: ResCallbackT<any>): any;
              zcard(...args: any[]): any;
              zscore(args: any[], callback?: ResCallbackT<any>): any;
              zscore(...args: any[]): any;
              zrank(args: any[], callback?: ResCallbackT<any>): any;
              zrank(...args: any[]): any;
              zrevrank(args: any[], callback?: ResCallbackT<any>): any;
              zrevrank(...args: any[]): any;
              hset(args: any[], callback?: ResCallbackT<any>): any;
              hset(...args: any[]): any;
              hsetnx(args: any[], callback?: ResCallbackT<any>): any;
              hsetnx(...args: any[]): any;
              hget(args: any[], callback?: ResCallbackT<any>): any;
              hget(...args: any[]): any;
              hmset(args: any[], callback?: ResCallbackT<any>): any;
              hmset(key: string, hash: any, callback?: ResCallbackT<any>): any;
              hmset(...args: any[]): any;
              hmget(args: any[], callback?: ResCallbackT<any>): any;
              hmget(...args: any[]): any;
              hincrby(args: any[], callback?: ResCallbackT<any>): any;
              hincrby(...args: any[]): any;
              hincrbyfloat(args: any[], callback?: ResCallbackT<any>): any;
              hincrbyfloat(...args: any[]): any;
              hdel(args: any[], callback?: ResCallbackT<any>): any;
              hdel(...args: any[]): any;
              hlen(args: any[], callback?: ResCallbackT<any>): any;
              hlen(...args: any[]): any;
              hkeys(args: any[], callback?: ResCallbackT<any>): any;
              hkeys(...args: any[]): any;
              hvals(args: any[], callback?: ResCallbackT<any>): any;
              hvals(...args: any[]): any;
              hgetall(args: any[], callback?: ResCallbackT<any>): any;
              hgetall(...args: any[]): any;
              hgetall(key: string, callback?: ResCallbackT<any>): any;
              hexists(args: any[], callback?: ResCallbackT<any>): any;
              hexists(...args: any[]): any;
              incrby(args: any[], callback?: ResCallbackT<any>): any;
              incrby(...args: any[]): any;
              incrbyfloat(args: any[], callback?: ResCallbackT<any>): any;
              incrbyfloat(...args: any[]): any;
              decrby(args: any[], callback?: ResCallbackT<any>): any;
              decrby(...args: any[]): any;
              getset(args: any[], callback?: ResCallbackT<any>): any;
              getset(...args: any[]): any;
              mset(args: any[], callback?: ResCallbackT<any>): any;
              mset(...args: any[]): any;
              msetnx(args: any[], callback?: ResCallbackT<any>): any;
              msetnx(...args: any[]): any;
              randomkey(args: any[], callback?: ResCallbackT<any>): any;
              randomkey(...args: any[]): any;
              select(args: any[], callback?: ResCallbackT<any>): void;
              select(...args: any[]): void;
              move(args: any[], callback?: ResCallbackT<any>): any;
              move(...args: any[]): any;
              rename(args: any[], callback?: ResCallbackT<any>): any;
              rename(...args: any[]): any;
              renamenx(args: any[], callback?: ResCallbackT<any>): any;
              renamenx(...args: any[]): any;
              expire(args: any[], callback?: ResCallbackT<any>): any;
              expire(...args: any[]): any;
              pexpire(args: any[], callback?: ResCallbackT<any>): any;
              pexpire(...args: any[]): any;
              expireat(args: any[], callback?: ResCallbackT<any>): any;
              expireat(...args: any[]): any;
              pexpireat(args: any[], callback?: ResCallbackT<any>): any;
              pexpireat(...args: any[]): any;
              keys(args: any[], callback?: ResCallbackT<any>): any;
              keys(...args: any[]): any;
              dbsize(args: any[], callback?: ResCallbackT<any>): any;
              dbsize(...args: any[]): any;
              auth(args: any[], callback?: ResCallbackT<any>): void;
              auth(...args: any[]): void;
              ping(args: any[], callback?: ResCallbackT<any>): any;
              ping(...args: any[]): any;
              echo(args: any[], callback?: ResCallbackT<any>): any;
              echo(...args: any[]): any;
              save(args: any[], callback?: ResCallbackT<any>): any;
              save(...args: any[]): any;
              bgsave(args: any[], callback?: ResCallbackT<any>): any;
              bgsave(...args: any[]): any;
              bgrewriteaof(args: any[], callback?: ResCallbackT<any>): any;
              bgrewriteaof(...args: any[]): any;
              shutdown(args: any[], callback?: ResCallbackT<any>): any;
              shutdown(...args: any[]): any;
              lastsave(args: any[], callback?: ResCallbackT<any>): any;
              lastsave(...args: any[]): any;
              type(args: any[], callback?: ResCallbackT<any>): any;
              type(...args: any[]): any;
              exec(args: any[], callback?: ResCallbackT<any>): any;
              exec(...args: any[]): any;
              discard(args: any[], callback?: ResCallbackT<any>): any;
              discard(...args: any[]): any;
              sync(args: any[], callback?: ResCallbackT<any>): any;
              sync(...args: any[]): any;
              flushdb(args: any[], callback?: ResCallbackT<any>): any;
              flushdb(...args: any[]): any;
              flushall(args: any[], callback?: ResCallbackT<any>): any;
              flushall(...args: any[]): any;
              sort(args: any[], callback?: ResCallbackT<any>): any;
              sort(...args: any[]): any;
              info(args: any[], callback?: ResCallbackT<any>): any;
              info(...args: any[]): any;
              time(args: any[], callback?: ResCallbackT<any>): any;
              time(...args: any[]): any;
              monitor(args: any[], callback?: ResCallbackT<any>): any;
              monitor(...args: any[]): any;
              ttl(args: any[], callback?: ResCallbackT<any>): any;
              ttl(...args: any[]): any;
              persist(args: any[], callback?: ResCallbackT<any>): any;
              persist(...args: any[]): any;
              slaveof(args: any[], callback?: ResCallbackT<any>): any;
              slaveof(...args: any[]): any;
              debug(args: any[], callback?: ResCallbackT<any>): any;
              debug(...args: any[]): any;
              config(args: any[], callback?: ResCallbackT<any>): any;
              config(...args: any[]): any;
              subscribe(args: any[], callback?: ResCallbackT<any>): any;
              subscribe(...args: any[]): any;
              unsubscribe(args: any[], callback?: ResCallbackT<any>): any;
              unsubscribe(...args: any[]): any;
              psubscribe(args: any[], callback?: ResCallbackT<any>): any;
              psubscribe(...args: any[]): any;
              punsubscribe(args: any[], callback?: ResCallbackT<any>): any;
              punsubscribe(...args: any[]): any;
              publish(args: any[], callback?: ResCallbackT<any>): any;
              publish(...args: any[]): any;
              watch(args: any[], callback?: ResCallbackT<any>): any;
              watch(...args: any[]): any;
              unwatch(args: any[], callback?: ResCallbackT<any>): any;
              unwatch(...args: any[]): any;
              cluster(args: any[], callback?: ResCallbackT<any>): any;
              cluster(...args: any[]): any;
              restore(args: any[], callback?: ResCallbackT<any>): any;
              restore(...args: any[]): any;
              migrate(args: any[], callback?: ResCallbackT<any>): any;
              migrate(...args: any[]): any;
              dump(args: any[], callback?: ResCallbackT<any>): any;
              dump(...args: any[]): any;
              object(args: any[], callback?: ResCallbackT<any>): any;
              object(...args: any[]): any;
              client(args: any[], callback?: ResCallbackT<any>): any;
              client(...args: any[]): any;
              eval(args: any[], callback?: ResCallbackT<any>): any;
              eval(...args: any[]): any;
              evalsha(args: any[], callback?: ResCallbackT<any>): any;
              evalsha(...args: any[]): any;
              script(args: any[], callback?: ResCallbackT<any>): any;
              script(key: string, callback?: ResCallbackT<any>): any;
              script(...args: any[]): any;
              quit(args: any[], callback?: ResCallbackT<any>): any;
              quit(...args: any[]): any;
              scan(args: any[], callback?: ResCallbackT<any>): any;
              scan(...args: any[]): any;
              hscan(args: any[], callback?: ResCallbackT<any>): any;
              hscan(...args: any[]): any;
              zscan(args: any[], callback?: ResCallbackT<any>): any;
              zscan(...args: any[]): any;
              pfmerge(args: any[], callback?: ResCallbackT<any>): any;
              pfmerge(...args: any[]): any;
              pfadd(args: any[], callback?: ResCallbackT<any>): any;
              pfadd(...args: any[]): any;
              pfcount(args: any[], callback?: ResCallbackT<any>): any;
              pfcount(...args: any[]): any;
      */
        pipeline(): Pipeline;
        pipeline(commands: string[][]): Pipeline;

        scanStream(options?: IORedis.ScanStreamOption): NodeJS.EventEmitter;
        hscanStream(key: string, options?: IORedis.ScanStreamOption): NodeJS.EventEmitter;
        zscanStream(key: string, options?: IORedis.ScanStreamOption): NodeJS.EventEmitter;
    }

    interface Pipeline extends Commands<boolean>
    {
        exec(): Promise<any[]>;
        /*
                get(args: any[], callback?: ResCallbackT<string>): Pipeline;
                get(...args: any[]): Pipeline;
                set(args: any[], callback?: ResCallbackT<string>): Pipeline;
                set(...args: any[]): Pipeline;
                setnx(args: any[], callback?: ResCallbackT<any>): Pipeline;
                setnx(...args: any[]): Pipeline;
                setex(args: any[], callback?: ResCallbackT<any>): Pipeline;
                setex(...args: any[]): Pipeline;
                psetex(args: any[], callback?: ResCallbackT<any>): Pipeline;
                psetex(...args: any[]): Pipeline;
                append(args: any[], callback?: ResCallbackT<any>): Pipeline;
                append(...args: any[]): Pipeline;
                strlen(args: any[], callback?: ResCallbackT<any>): Pipeline;
                strlen(...args: any[]): Pipeline;
                del(args: any[], callback?: ResCallbackT<any>): Pipeline;
                del(...args: any[]): Pipeline;
                exists(args: any[], callback?: ResCallbackT<any>): Pipeline;
                exists(...args: any[]): Pipeline;
                setbit(args: any[], callback?: ResCallbackT<any>): Pipeline;
                setbit(...args: any[]): Pipeline;
                getbit(args: any[], callback?: ResCallbackT<any>): Pipeline;
                getbit(...args: any[]): Pipeline;
                setrange(args: any[], callback?: ResCallbackT<any>): Pipeline;
                setrange(...args: any[]): Pipeline;
                getrange(args: any[], callback?: ResCallbackT<any>): Pipeline;
                getrange(...args: any[]): Pipeline;
                substr(args: any[], callback?: ResCallbackT<any>): Pipeline;
                substr(...args: any[]): Pipeline;
                incr(args: any[], callback?: ResCallbackT<any>): Pipeline;
                incr(...args: any[]): Pipeline;
                decr(args: any[], callback?: ResCallbackT<any>): Pipeline;
                decr(...args: any[]): Pipeline;
                mget(args: any[], callback?: ResCallbackT<any>): Pipeline;
                mget(...args: any[]): Pipeline;
                rpush(...args: any[]): Pipeline;
                lpush(args: any[], callback?: ResCallbackT<any>): Pipeline;
                lpush(...args: any[]): Pipeline;
                rpushx(args: any[], callback?: ResCallbackT<any>): Pipeline;
                rpushx(...args: any[]): Pipeline;
                lpushx(args: any[], callback?: ResCallbackT<any>): Pipeline;
                lpushx(...args: any[]): Pipeline;
                linsert(args: any[], callback?: ResCallbackT<any>): Pipeline;
                linsert(...args: any[]): Pipeline;
                rpop(args: any[], callback?: ResCallbackT<any>): Pipeline;
                rpop(...args: any[]): Pipeline;
                lpop(args: any[], callback?: ResCallbackT<any>): Pipeline;
                lpop(...args: any[]): Pipeline;
                brpop(args: any[], callback?: ResCallbackT<any>): Pipeline;
                brpop(...args: any[]): Pipeline;
                brpoplpush(args: any[], callback?: ResCallbackT<any>): Pipeline;
                brpoplpush(...args: any[]): Pipeline;
                blpop(args: any[], callback?: ResCallbackT<any>): Pipeline;
                blpop(...args: any[]): Pipeline;
                llen(args: any[], callback?: ResCallbackT<any>): Pipeline;
                llen(...args: any[]): Pipeline;
                lindex(args: any[], callback?: ResCallbackT<any>): Pipeline;
                lindex(...args: any[]): Pipeline;
                lset(args: any[], callback?: ResCallbackT<any>): Pipeline;
                lset(...args: any[]): Pipeline;
                lrange(args: any[], callback?: ResCallbackT<any>): Pipeline;
                lrange(...args: any[]): Pipeline;
                ltrim(args: any[], callback?: ResCallbackT<any>): Pipeline;
                ltrim(...args: any[]): Pipeline;
                lrem(args: any[], callback?: ResCallbackT<any>): Pipeline;
                lrem(...args: any[]): Pipeline;
                rpoplpush(args: any[], callback?: ResCallbackT<any>): Pipeline;
                rpoplpush(...args: any[]): Pipeline;
                sadd(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sadd(...args: any[]): Pipeline;
                srem(args: any[], callback?: ResCallbackT<any>): Pipeline;
                srem(...args: any[]): Pipeline;
                smove(args: any[], callback?: ResCallbackT<any>): Pipeline;
                smove(...args: any[]): Pipeline;
                sismember(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sismember(...args: any[]): Pipeline;
                scard(args: any[], callback?: ResCallbackT<any>): Pipeline;
                scard(...args: any[]): Pipeline;
                spop(args: any[], callback?: ResCallbackT<any>): Pipeline;
                spop(...args: any[]): Pipeline;
                srandmember(args: any[], callback?: ResCallbackT<any>): Pipeline;
                srandmember(...args: any[]): Pipeline;
                sinter(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sinter(...args: any[]): Pipeline;
                sinterstore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sinterstore(...args: any[]): Pipeline;
                sunion(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sunion(...args: any[]): Pipeline;
                sunionstore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sunionstore(...args: any[]): Pipeline;
                sdiff(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sdiff(...args: any[]): Pipeline;
                sdiffstore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sdiffstore(...args: any[]): Pipeline;
                smembers(args: any[], callback?: ResCallbackT<any>): Pipeline;
                smembers(...args: any[]): Pipeline;
                zadd(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zadd(...args: any[]): Pipeline;
                zincrby(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zincrby(...args: any[]): Pipeline;
                zrem(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zrem(...args: any[]): Pipeline;
                zremrangebyscore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zremrangebyscore(...args: any[]): Pipeline;
                zremrangebyrank(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zremrangebyrank(...args: any[]): Pipeline;
                zunionstore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zunionstore(...args: any[]): Pipeline;
                zinterstore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zinterstore(...args: any[]): Pipeline;
                zrange(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zrange(...args: any[]): Pipeline;
                zrangebyscore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zrangebyscore(...args: any[]): Pipeline;
                zrevrangebyscore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zrevrangebyscore(...args: any[]): Pipeline;
                zcount(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zcount(...args: any[]): Pipeline;
                zrevrange(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zrevrange(...args: any[]): Pipeline;
                zcard(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zcard(...args: any[]): Pipeline;
                zscore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zscore(...args: any[]): Pipeline;
                zrank(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zrank(...args: any[]): Pipeline;
                zrevrank(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zrevrank(...args: any[]): Pipeline;
                hset(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hset(...args: any[]): Pipeline;
                hsetnx(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hsetnx(...args: any[]): Pipeline;
                hget(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hget(...args: any[]): Pipeline;
                hmset(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hmset(key: string, hash: any, callback?: ResCallbackT<any>): Pipeline;
                hmset(...args: any[]): Pipeline;
                hmget(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hmget(...args: any[]): Pipeline;
                hincrby(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hincrby(...args: any[]): Pipeline;
                hincrbyfloat(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hincrbyfloat(...args: any[]): Pipeline;
                hdel(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hdel(...args: any[]): Pipeline;
                hlen(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hlen(...args: any[]): Pipeline;
                hkeys(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hkeys(...args: any[]): Pipeline;
                hvals(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hvals(...args: any[]): Pipeline;
                hgetall(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hgetall(...args: any[]): Pipeline;
                hgetall(key: string, callback?: ResCallbackT<any>): Pipeline;
                hexists(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hexists(...args: any[]): Pipeline;
                incrby(args: any[], callback?: ResCallbackT<any>): Pipeline;
                incrby(...args: any[]): Pipeline;
                incrbyfloat(args: any[], callback?: ResCallbackT<any>): Pipeline;
                incrbyfloat(...args: any[]): Pipeline;
                decrby(args: any[], callback?: ResCallbackT<any>): Pipeline;
                decrby(...args: any[]): Pipeline;
                getset(args: any[], callback?: ResCallbackT<any>): Pipeline;
                getset(...args: any[]): Pipeline;
                mset(args: any[], callback?: ResCallbackT<any>): Pipeline;
                mset(...args: any[]): Pipeline;
                msetnx(args: any[], callback?: ResCallbackT<any>): Pipeline;
                msetnx(...args: any[]): Pipeline;
                randomkey(args: any[], callback?: ResCallbackT<any>): Pipeline;
                randomkey(...args: any[]): Pipeline;
                select(args: any[], callback?: ResCallbackT<any>): void;
                select(...args: any[]): Pipeline;
                move(args: any[], callback?: ResCallbackT<any>): Pipeline;
                move(...args: any[]): Pipeline;
                rename(args: any[], callback?: ResCallbackT<any>): Pipeline;
                rename(...args: any[]): Pipeline;
                renamenx(args: any[], callback?: ResCallbackT<any>): Pipeline;
                renamenx(...args: any[]): Pipeline;
                expire(args: any[], callback?: ResCallbackT<any>): Pipeline;
                expire(...args: any[]): Pipeline;
                pexpire(args: any[], callback?: ResCallbackT<any>): Pipeline;
                pexpire(...args: any[]): Pipeline;
                expireat(args: any[], callback?: ResCallbackT<any>): Pipeline;
                expireat(...args: any[]): Pipeline;
                pexpireat(args: any[], callback?: ResCallbackT<any>): Pipeline;
                pexpireat(...args: any[]): Pipeline;
                keys(args: any[], callback?: ResCallbackT<any>): Pipeline;
                keys(...args: any[]): Pipeline;
                dbsize(args: any[], callback?: ResCallbackT<any>): Pipeline;
                dbsize(...args: any[]): Pipeline;
                auth(args: any[], callback?: ResCallbackT<any>): void;
                auth(...args: any[]): void;
                ping(args: any[], callback?: ResCallbackT<any>): Pipeline;
                ping(...args: any[]): Pipeline;
                echo(args: any[], callback?: ResCallbackT<any>): Pipeline;
                echo(...args: any[]): Pipeline;
                save(args: any[], callback?: ResCallbackT<any>): Pipeline;
                save(...args: any[]): Pipeline;
                bgsave(args: any[], callback?: ResCallbackT<any>): Pipeline;
                bgsave(...args: any[]): Pipeline;
                bgrewriteaof(args: any[], callback?: ResCallbackT<any>): Pipeline;
                bgrewriteaof(...args: any[]): Pipeline;
                shutdown(args: any[], callback?: ResCallbackT<any>): Pipeline;
                shutdown(...args: any[]): Pipeline;
                lastsave(args: any[], callback?: ResCallbackT<any>): Pipeline;
                lastsave(...args: any[]): Pipeline;
                type(args: any[], callback?: ResCallbackT<any>): Pipeline;
                type(...args: any[]): Pipeline;
                multi(args: any[], callback?: ResCallbackT<any>): Pipeline;
                multi(...args: any[]): Pipeline;
                exec(args: any[], callback?: ResCallbackT<any>): Pipeline;
                exec(...args: any[]): Pipeline;
                discard(args: any[], callback?: ResCallbackT<any>): Pipeline;
                discard(...args: any[]): Pipeline;
                sync(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sync(...args: any[]): Pipeline;
                flushdb(args: any[], callback?: ResCallbackT<any>): Pipeline;
                flushdb(...args: any[]): Pipeline;
                flushall(args: any[], callback?: ResCallbackT<any>): Pipeline;
                flushall(...args: any[]): Pipeline;
                sort(args: any[], callback?: ResCallbackT<any>): Pipeline;
                sort(...args: any[]): Pipeline;
                info(args: any[], callback?: ResCallbackT<any>): Pipeline;
                info(...args: any[]): Pipeline;
                time(args: any[], callback?: ResCallbackT<any>): Pipeline;
                time(...args: any[]): Pipeline;
                monitor(args: any[], callback?: ResCallbackT<any>): Pipeline;
                monitor(...args: any[]): Pipeline;
                ttl(args: any[], callback?: ResCallbackT<any>): Pipeline;
                ttl(...args: any[]): Pipeline;
                persist(args: any[], callback?: ResCallbackT<any>): Pipeline;
                persist(...args: any[]): Pipeline;
                slaveof(args: any[], callback?: ResCallbackT<any>): Pipeline;
                slaveof(...args: any[]): Pipeline;
                debug(args: any[], callback?: ResCallbackT<any>): Pipeline;
                debug(...args: any[]): Pipeline;
                config(args: any[], callback?: ResCallbackT<any>): Pipeline;
                config(...args: any[]): Pipeline;
                subscribe(args: any[], callback?: ResCallbackT<any>): Pipeline;
                subscribe(...args: any[]): Pipeline;
                unsubscribe(args: any[], callback?: ResCallbackT<any>): Pipeline;
                unsubscribe(...args: any[]): Pipeline;
                psubscribe(args: any[], callback?: ResCallbackT<any>): Pipeline;
                psubscribe(...args: any[]): Pipeline;
                punsubscribe(args: any[], callback?: ResCallbackT<any>): Pipeline;
                punsubscribe(...args: any[]): Pipeline;
                publish(args: any[], callback?: ResCallbackT<any>): Pipeline;
                publish(...args: any[]): Pipeline;
                watch(args: any[], callback?: ResCallbackT<any>): Pipeline;
                watch(...args: any[]): Pipeline;
                unwatch(args: any[], callback?: ResCallbackT<any>): Pipeline;
                unwatch(...args: any[]): Pipeline;
                cluster(args: any[], callback?: ResCallbackT<any>): Pipeline;
                cluster(...args: any[]): Pipeline;
                restore(args: any[], callback?: ResCallbackT<any>): Pipeline;
                restore(...args: any[]): Pipeline;
                migrate(args: any[], callback?: ResCallbackT<any>): Pipeline;
                migrate(...args: any[]): Pipeline;
                dump(args: any[], callback?: ResCallbackT<any>): Pipeline;
                dump(...args: any[]): Pipeline;
                object(args: any[], callback?: ResCallbackT<any>): Pipeline;
                object(...args: any[]): Pipeline;
                client(args: any[], callback?: ResCallbackT<any>): Pipeline;
                client(...args: any[]): Pipeline;
                eval(args: any[], callback?: ResCallbackT<any>): Pipeline;
                eval(...args: any[]): Pipeline;
                evalsha(args: any[], callback?: ResCallbackT<any>): Pipeline;
                evalsha(...args: any[]): Pipeline;
                quit(args: any[], callback?: ResCallbackT<any>): Pipeline;
                quit(...args: any[]): Pipeline;
                scan(...args: any[]): Pipeline;
                scan(args: any[], callback?: ResCallbackT<any>): Pipeline;
                hscan(...args: any[]): Pipeline;
                hscan(args: any[], callback?: ResCallbackT<any>): Pipeline;
                zscan(...args: any[]): Pipeline;
                zscan(args: any[], callback?: ResCallbackT<any>): Pipeline;*/
    }

    interface Cluster extends NodeJS.EventEmitter, Commander
    {
        new(nodes: { host: string; port: number; }[], options?: IORedis.ClusterOptions): Redis;
        connect(callback: Function): Promise<any>;
        disconnect(): void;
        nodes(role: string): Redis[];
    }

    interface ResCallbackT<R>
    {
        (err: Error, res: R): void;
    }

    interface RedisOptions
    {
        port?: number;
        host?: string;
        /**
         * 4 (IPv4) or 6 (IPv6), Defaults to 4.
         */
        family?: number;
        /**
         * Local domain socket path. If set the port, host and family will be ignored.
         */
        path?: string;
        /**
         * TCP KeepAlive on the socket with a X ms delay before start. Set to a non-number value to disable keepAlive.
         */
        keepAlive?: number;
        connectionName?: string;
        /**
         * If set, client will send AUTH command with the value of this option when connected.
         */
        password?: string;
        /**
         * Database index to use.
         */
        db?: number;
        /**
         * When a connection is established to the Redis server, the server might still be loading
         * the database from disk. While loading, the server not respond to any commands.
         * To work around this, when this option is true, ioredis will check the status of the Redis server,
         * and when the Redis server is able to process commands, a ready event will be emitted.
         */
        enableReadyCheck?: boolean;
        keyPrefix?: string;
        /**
         * When the return value isn't a number, ioredis will stop trying to reconnect.
         * Fixed in: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/15858
         */
        retryStrategy?: (times: number) => number | false;
        reconnectOnError?: (error: Error) => boolean;
        /**
         * By default, if there is no active connection to the Redis server, commands are added to a queue
         * and are executed once the connection is "ready" (when enableReadyCheck is true, "ready" means
         * the Redis server has loaded the database from disk, otherwise means the connection to the Redis
         * server has been established). If this option is false, when execute the command when the connection
         * isn't ready, an error will be returned.
         */
        enableOfflineQueue?: boolean;
        /**
         * The milliseconds before a timeout occurs during the initial connection to the Redis server.
         * default: 10000.
         */
        connectTimeout?: number;
        /**
         * After reconnected, if the previous connection was in the subscriber mode, client will auto re-subscribe these channels.
         * default: true.
         */
        autoResubscribe?: boolean;
        /**
         * If true, client will resend unfulfilled commands(e.g. block commands) in the previous connection when reconnected.
         * default: true.
         */
        autoResendUnfulfilledCommands?: boolean;
        lazyConnect?: boolean;
        tls?: {
            ca: Buffer;
        };
        sentinels?: { host: string; port: number; }[];
        name?: string;
        /**
         * Enable READONLY mode for the connection. Only available for cluster mode.
         * default: false.
         */
        readOnly?: boolean;
        /**
        * If you are using the hiredis parser, it's highly recommended to enable this option. Create another instance with dropBufferSupport disabled for other commands that you want to return binary instead of string:
        */
        dropBufferSupport?: boolean;
        /**
         * Whether to show a friendly error stack. Will decrease the performance significantly.
         */
        showFriendlyErrorStack?: boolean;
    }

    interface ScanStreamOption
    {
        match?: string;
        count?: number;
    }

    interface ClusterOptions
    {
        clusterRetryStrategy?: (times: number) => number;
        enableOfflineQueue?: boolean;
        enableReadyCheck?: boolean;
        scaleReads?: string;
        maxRedirections?: number;
        retryDelayOnFailover?: number;
        retryDelayOnClusterDown?: number;
        retryDelayOnTryAgain?: number;
        redisOptions?: RedisOptions;
    }
}
