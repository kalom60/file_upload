interface IDBConfig {
  HOST: string;
  USER: string;
  PASSWORD: string;
  DATABASE: string;
  DIALECT: string;
}

const dbConfig: IDBConfig = {
  HOST: "127.0.0.1",
  USER: "root",
  PASSWORD: "mysql60tmc",
  DATABASE: "fileupload",
  DIALECT: "mysql",
};

export default dbConfig;
