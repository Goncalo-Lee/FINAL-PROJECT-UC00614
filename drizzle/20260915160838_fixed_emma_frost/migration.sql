ALTER TABLE `2fa` ADD `id_account` char(26) NOT NULL;--> statement-breakpoint
ALTER TABLE `2fa` ADD CONSTRAINT `2fa_id_account_account_id_fkey` FOREIGN KEY (`id_account`) REFERENCES `account`(`id`);