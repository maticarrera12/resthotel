package com.resthotels.resthotel;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ResthotelApplication {

	public static void main(String[] args) {
		// Cargar variables desde el archivo .env
		Dotenv dotenv = Dotenv.configure()
				.load();

		// Pasar las variables como propiedades del sistema
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		System.setProperty("AWS_ACCESS_KEY_ID", dotenv.get("AWS_ACCESS_KEY_ID", ""));
		System.setProperty("AWS_SECRET_ACCESS_KEY", dotenv.get("AWS_SECRET_ACCESS_KEY", ""));

		SpringApplication.run(ResthotelApplication.class, args);
	}
}

