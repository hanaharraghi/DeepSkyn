import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { KeycloakAdminService } from "../auth/keycloak-admin.service";

@Module({
  controllers: [AdminController],
  providers: [KeycloakAdminService],
})
export class AdminModule {}