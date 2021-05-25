module.exports = (sequelize, DataTypes) => {
    return sequelize.define('imageurls', {
        id: {
            type: DataTypes.INTEGER, // 자료형
            primaryKey: true, // Primary Key 여부
            autoIncrement: true, // 자동증가 여부
          },
        imgUrl: {
            type: DataTypes.STRING(200),
        },
        location: {
            type: DataTypes.STRING(200),
        },
    }, {
        timestamps: true,
        underscored: true,
        freezeTableName: true,
        tableName : "imageurls"
    });
};
