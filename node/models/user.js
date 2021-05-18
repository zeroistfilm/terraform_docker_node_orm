module.exports = (sequelize, DataTypes) => {
    return sequelize.define('new_table', {
        
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            AutoIncrement: true,
        },
        UserIDFromKakao: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        NickName: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        UserImage: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        FirebaseToken: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        timestamps: false,
        freezeTableName: true,
        tableName : "new_table"
    });
};
