import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRoles } from './entities/users-roles.entity';
import { Roles } from './entities/roles.entity';
import { Users } from './entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './modules/auth/auth.controller';
import { AuthService } from './modules/auth/auth.service';
import { ActiveDirectoryService } from './modules/auth/active-directory.service';
import { RoleService } from './modules/role/role.service';
import { UsersRolesService } from './modules/users-roles/users-roles.service';
import { BranchesDirectory } from './entities/directories/branches-directory.entity';
import { DistrictsDirectory } from './entities/directories/districts-directory.entity';
import { ObjectsDirectory } from './entities/directories/objects-directory.entity';
import { OtherEquipmentDirectory } from './entities/directories/other-equipment-directory.entity';
import { BatteriesDirectory } from './entities/directories/batteries-directory.entity';
import { BatteriesDirectoryController } from './modules/directories/batteries-directory/batteries-directory.controller';
import { BatteriesDirectoryService } from './modules/directories/batteries-directory/batteries-directory.service';
import { OtherEquipmentDirectoryController } from './modules/directories/other-equipment-directory/other-equipment-directory.controller';
import { OtherEquipmentDirectoryService } from './modules/directories/other-equipment-directory/other-equipment-directory.service';
import { UPSModelsDirectory } from './entities/directories/ups-models-directory.entity';
import { UPSModelsDirectoryService } from './modules/directories/ups-models-directory/ups-models-directory.service';
import { UPSModelsDirectoryController } from './modules/directories/ups-models-directory/ups-models-directory.controller';
import { BranchesDirectoryController } from './modules/directories/branches-directory/branches-directory.controller';
import { BranchesDirectoryService } from './modules/directories/branches-directory/branches-directory.service';
import { DistrictsDirectoryController } from './modules/directories/districts-directory/districts-directory.controller';
import { DistrictsDirectoryService } from './modules/directories/districts-directory/districts-directory.service';
import { ObjectsDirectoryService } from './modules/directories/objects-directory/objects-directory.service';
import { ObjectsDirectoryController } from './modules/directories/objects-directory/objects-directory.controller';
import { BatteryReplacement } from './entities/directories/battery-replacement.entity';
import { EquipmentCard } from './entities/directories/equipment-card.entity';
import { Costs } from './entities/directories/costs.entity';
import { Receipt } from './entities/directories/receipts.entity';
import { Total } from './entities/directories/total.entity';
import { CostsController } from './modules/general-tables/costs/costs.controller';
import { CostsService } from './modules/general-tables/costs/costs.service';
import { ReceiptController } from './modules/general-tables/receipt/receipt.controller';
import { ReceiptService } from './modules/general-tables/receipt/receipt.service';
import { BatteryReplacementService } from './modules/general-tables/battery-replacement/battery-replacement.service';
import { BatteryReplacementController } from './modules/general-tables/battery-replacement/battery-replacement.controller';
import { EquipmentCardController } from './modules/general-tables/equipment-card/equipment-card.controller';
import { EquipmentCardService } from './modules/general-tables/equipment-card/equipment-card.service';
import { TotalController } from './modules/general-tables/total/total.controller';
import { TotalService } from './modules/general-tables/total/total.service';
import { ConfigModule } from '@nestjs/config';
import { BudgetApiController } from './modules/budget-api/budget-api.controller';
import { BudgetApiService } from './modules/budget-api/budget-api.service';
import { BudgetApiDbService } from './modules/budget-api/budget-api.db';
import { Notifications } from './entities/notifications.entity';
import { NotificationsService } from './modules/notifications/notifications.service';
import { NotificationsController } from './modules/notifications/notifications.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Users,
        Roles,
        UsersRoles,
        BranchesDirectory,
        DistrictsDirectory,
        ObjectsDirectory,
        BatteriesDirectory,
        OtherEquipmentDirectory,
        UPSModelsDirectory,
        Total,
        Receipt,
        Costs,
        EquipmentCard,
        BatteryReplacement,
        Notifications,
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Users,
      Roles,
      UsersRoles,
      BranchesDirectory,
      DistrictsDirectory,
      ObjectsDirectory,
      BatteriesDirectory,
      OtherEquipmentDirectory,
      UPSModelsDirectory,
      Total,
      Receipt,
      Costs,
      EquipmentCard,
      BatteryReplacement,
      Notifications,
    ]),
    JwtModule.register({
      secret: 'abdulalhazred',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [
    AuthController,
    BatteriesDirectoryController,
    OtherEquipmentDirectoryController,
    UPSModelsDirectoryController,
    BranchesDirectoryController,
    DistrictsDirectoryController,
    ObjectsDirectoryController,
    CostsController,
    ReceiptController,
    BatteryReplacementController,
    EquipmentCardController,
    TotalController,
    BudgetApiController,
    NotificationsController,
  ],
  providers: [
    AuthService,
    ActiveDirectoryService,
    RoleService,
    UsersRolesService,
    BatteriesDirectoryService,
    OtherEquipmentDirectoryService,
    UPSModelsDirectoryService,
    BranchesDirectoryService,
    DistrictsDirectoryService,
    ObjectsDirectoryService,
    CostsService,
    ReceiptService,
    BatteryReplacementService,
    EquipmentCardService,
    TotalService,
    BudgetApiService,
    BudgetApiDbService,
    NotificationsService,
  ],
})
export class AppModule {}
