import {
  Module,
} from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProductManagementModule } from './product/product-management.module';
import { InquiryModule } from './inquiry/inquiry.module';
import { ProfileControllerModule } from './profile/profile-cont.module';
import { StorageControllerModule } from './storage/storage.module';

@Module({
  imports: [AuthenticationModule, ProductManagementModule, InquiryModule, ProfileControllerModule, StorageControllerModule],
})
export class ControllerModule {}
