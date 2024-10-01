db('city');

const tableName = 'city';

({
    async read(id) {
        const data = await db(tableName).read(id, ['id', 'name']);
        return data.rows;
    },

    async create({ name, country }) {
        const data = await db(tableName).create({ name, country });
        return data.rows;
    },

    async update(id, props) {
        const data = await db(tableName).update(id, { ...props });
        return data.rows;
    },

    async delete(id) {
        const data = await db(tableName).delete(id);
        return data.rows;
    },
});
