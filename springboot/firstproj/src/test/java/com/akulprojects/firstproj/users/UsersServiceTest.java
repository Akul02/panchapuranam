// package com.akulprojects.firstproj.users;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertFalse;
// import static org.junit.jupiter.api.Assertions.assertThrows;
// import static org.junit.jupiter.api.Assertions.assertTrue;
// import static org.mockito.Mockito.*;


// import java.util.Optional;

// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.ArgumentCaptor;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;

// import com.akulprojects.firstproj.exception.ConflictException;
// import com.akulprojects.firstproj.exception.InvalidInputException;
// import com.akulprojects.firstproj.features.teachers.dtos.TeachersSignUpDto;
// import com.akulprojects.firstproj.features.users.Role;
// import com.akulprojects.firstproj.features.users.Users;
// import com.akulprojects.firstproj.features.users.UsersRepo;
// import com.akulprojects.firstproj.features.users.UsersService;
// import com.password4j.Password;

// @ExtendWith(MockitoExtension.class)
// public class UsersServiceTest {

//     @Mock
//     UsersRepo usersRepo;

//     @InjectMocks
//     UsersService usersService;

//     @Test
//     void changeUserPassword_sameAsOldPassword_throwsInvalidInputException () {
        
//         Users testUser = new Users("first", "last", "test@mail.com", Password.hash("oldPassword").addRandomSalt().withArgon2().getResult(), Role.TEACHER, false);

//         when(usersRepo.findById(0)).thenReturn(Optional.of(testUser));       

//         assertThrows(InvalidInputException.class, () -> {usersService.changeUserPassword("oldPassword", 0);});
//     }

//     @Test
//     void changeUserPassword_validInput_updatesPassword () {

//         Users testUser = new Users("first", "last", "test@mail.com", Password.hash("oldPassword").addRandomSalt().withArgon2().getResult(), Role.TEACHER, true);

//         when(usersRepo.findById(0)).thenReturn(Optional.of(testUser));
//         usersService.changeUserPassword("newPassword", 0);

//         assertFalse(Password.check("oldPassword", testUser.getPassword()).withArgon2());
//         assertTrue(Password.check("newPassword", testUser.getPassword()).withArgon2());
//     }

//     @Test
//     void changeUserPassword_validInput_updatesIsFirstLogin () {

//         Users testUser = new Users("first", "last", "test@mail.com", Password.hash("oldPassword").addRandomSalt().withArgon2().getResult(), Role.TEACHER, false);

//         when(usersRepo.findById(0)).thenReturn(Optional.of(testUser));
//         usersService.changeUserPassword("newPassword", 0);

//         assertFalse(testUser.isFirstLogin());
//     }

//     @Test
//     void addTeacherUser_EmailAlreadyUsed_throwsConflictException () {
//         TeachersSignUpDto signUpDto = new TeachersSignUpDto("first", "last", "test@mail.com", "password");
        
//         Users existingUser = new Users("first", "last", "test@mail.com", Password.hash("oldPassword").addRandomSalt().withArgon2().getResult(), Role.TEACHER, false);
        
//         when(usersRepo.findByEmail(signUpDto.getEmail())).thenReturn(Optional.of(existingUser));

//         assertThrows(ConflictException.class, () -> {usersService.addTeacherUser(signUpDto);});
//     }

//     @Test
//     void addTeacherUser_validInput_savesTeacher () {
//         TeachersSignUpDto signUpDto = new TeachersSignUpDto("first", "last", "test@mail.com", "password");

//         usersService.addTeacherUser(signUpDto);

//         ArgumentCaptor<Users> capturedUser = ArgumentCaptor.forClass(Users.class);

//         verify(usersRepo).save(capturedUser.capture());

//         Users savedUser = capturedUser.getValue();

//         assertEquals("first", savedUser.getFirstName());
//         assertEquals("last", savedUser.getLastName());
//         assertEquals("test@mail.com", savedUser.getEmail());
//         assertTrue(Password.check("password", savedUser.getPassword()).withArgon2());

//     }


// }
