package eth.system.springboot;

import io.github.cdimascio.dotenv.Dotenv;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class EmployeeTimeKeepingSystemApplication {

	@Bean
	public ModelMapper modelMapper(){

		return new ModelMapper();
	}

	public static void main(String[] args) {

		// Load the .env file
		Dotenv dotenv = Dotenv.load();

		// Set system properties from .env
		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
		System.setProperty("JWT_EXPIRATION", dotenv.get("JWT_EXPIRATION"));
		System.setProperty("SS_USER", dotenv.get("SS_USER"));
		System.setProperty("SS_PASSWORD", dotenv.get("SS_PASSWORD"));

		SpringApplication.run(EmployeeTimeKeepingSystemApplication.class, args);
	}

}
