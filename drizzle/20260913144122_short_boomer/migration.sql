CREATE TABLE `2fa` (
	`id` char(26) PRIMARY KEY,
	`code` char(6) NOT NULL,
	`succeed` boolean NOT NULL DEFAULT false,
	`can_be_used` boolean NOT NULL DEFAULT true,
	`purpose` enum('login','password_reset','account_activation') NOT NULL,
	`soft_delete` boolean NOT NULL DEFAULT false,
	`expired_at` datetime NOT NULL,
	`used_at` datetime,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL
);
