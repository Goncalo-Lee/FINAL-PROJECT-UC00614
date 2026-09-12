CREATE TABLE `account` (
	`id` char(26) PRIMARY KEY,
	`first_name` varchar(50) NOT NULL,
	`last_name` varchar(50) NOT NULL,
	`birth_date` date NOT NULL,
	`phone` char(20) NOT NULL,
	`email` varchar(50) NOT NULL,
	`password` varchar(255),
	`role` enum('admin','user') NOT NULL DEFAULT 'user',
	`is_active` boolean NOT NULL DEFAULT false,
	`profile_image` varchar(255),
	`soft_delete` boolean NOT NULL DEFAULT false,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`)
);
