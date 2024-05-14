'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('publicacion', {
			idpublicacion: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
			},
			titulo: {
				type: Sequelize.STRING,
				allowNull: false
			},
			descripcion: {
				type: Sequelize.STRING,
				allowNull: false
			},
			fecha: {
				type: Sequelize.DATE,
				allowNull: false
			},
			usuarioid: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'colaborador',
					key: 'idcolaborador'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			grupoid: {
				allowNull: false,
				type: Sequelize.UUID,
				references: {
					model: 'grupo',
					key: 'idgrupo'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('publicacion');
	}
};