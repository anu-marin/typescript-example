import {  Model, DataTypes, Op } from 'sequelize';
import { sequelize } from '../sequalize';

export class Stories extends Model {
  public id!: number;
  public launch_date!: Date;
  public title!: string;
  public privacy!: string;
  public likes!: number;
  public readonly isDeleted!: boolean;
  public readonly creationDate!: Date;
  public readonly updatedAt!: Date;
}

Stories.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  launch_date: {
    type: new DataTypes.DATEONLY,
    allowNull: false,
  },
  title: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  privacy: {
    type: new DataTypes.STRING(128),
    allowNull: true
  },
  likes: {
    type: new DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: 'stories',
  sequelize: sequelize, 
  timestamps: true,
  freezeTableName:true
});

export const findStories = async (req) => {
  try {
    const stories = await Stories.findAll({
      where: {
        [Op.and]: [
          { privacy: req.params.privacy },
          {
            likes: {
              [Op.gt]: req.params.minlikes
            }
          }
        ]
      }
    });
    return stories;
  } catch (e) {
    console.log('Error in findAll', e);
  }
}
