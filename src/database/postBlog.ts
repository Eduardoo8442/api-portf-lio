import DataBase from "../database/database";

interface ObjectPost {
message: string;
date: string;
image: string;
}
class HandleBlogPost {
    private db: any;

    constructor() {
        this.db = null;
    }

    public async init() {
        this.db = await DataBase.getInstance();
    }

    public async postBlog(form: ObjectPost) {
        if (!this.db) throw new Error('Database not initialized!');
       if(!form.date || !form.message) throw new Error('Argumentos faltando!');
        try {
            await this.db.query('INSERT INTO posts (message, image, date) VALUES (?, ?, ?)', [form.message, form.image, form.date]);
            return true;
        } catch(e) {
            throw new Error('Ocorreu um erro ao tentar enviar os dados para o banco de dados.');
            console.log(e);
        }
    }  
}

export default HandleBlogPost;
