const file = (sequelize: any, DataTypes: any) => {
  const File = sequelize.define(
    "file",
    {
      fileName: DataTypes.STRING,
      fileSize: DataTypes.STRING,
      data: DataTypes.BLOB("long"),
    },
    {}
  );

  return File;
};

export default file;
