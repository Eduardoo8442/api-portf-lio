import DataBase from "../database/database";

class HandleBlogList {
    private db: any;

    constructor() {
        this.db = null;
    }

    public async init() {
        this.db = await DataBase.getInstance();
    }

    public async getList() {
        if (!this.db) {
            throw new Error('Database not initialized!');
        }

        const [rows]: any = await this.db.query('SELECT * FROM posts');
        if (!rows || rows.length === 0) return false;
        return rows;
    }
}

export default HandleBlogList;
