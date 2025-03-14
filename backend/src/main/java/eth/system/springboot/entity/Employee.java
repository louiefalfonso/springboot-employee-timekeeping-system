package eth.system.springboot.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String employeeNumber;

    private String position;

    private String emailAddress;

    private String phoneNumber;

    private String employeeStatus;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd-yyyy")
    private Date dateOfBirth;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

}
