package com.automationintesting.integration;

import com.automationintesting.api.BookingApplication;
import com.automationintesting.model.db.Booking;
import com.xebialabs.restito.server.StubServer;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.glassfish.grizzly.http.util.HttpStatus;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

import static com.xebialabs.restito.builder.stub.StubHttp.whenHttp;
import static com.xebialabs.restito.semantics.Action.status;
import static com.xebialabs.restito.semantics.Condition.post;
import static io.restassured.RestAssured.given;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT, classes = BookingApplication.class)
@ActiveProfiles("dev")
public class GetBookingIT {

    StubServer server = new StubServer(3004).run();

    @BeforeEach
    public void setupRestito(){
        whenHttp(server).
                match(post("/auth/validate")).
                then(status(HttpStatus.OK_200));
    }

    @AfterEach
    public void stopServer() throws InterruptedException {
        server.stop();

        // Mock takes time to stop so we have to wait for it to complete
        Thread.sleep(1500);
    }

    @Test
    public void getValidBooking(){
        Response response = given()
                                .cookie("token", "abc123")
                                .get("http://localhost:3000/booking/1");

        Assertions.assertEquals(200, response.getStatusCode());
    }

    @Test
    public void getInvalidBooking(){
        Response response = given()
                                .cookie("token", "abc123")
                                .get("http://localhost:3000/booking/1000");

        Assertions.assertEquals(404, response.getStatusCode());
    }

    @Test
    public void getQueryAvailableRoomsByDate(){
        Response response = given()
                .queryParam("checkin", "2022-02-01")
                .queryParam("checkout", "2022-02-05")
                .get("http://localhost:3000/booking/unavailable");

        Assertions.assertEquals(200, response.getStatusCode());
        Assertions.assertEquals(1, response.as(List.class).size());
    }

    @Test
    public void getEmptyQueryAvailableRoomsByDate() {
        Response response = given()
                .queryParam("checkin", "2020-02-01")
                .queryParam("checkout", "2020-02-05")
                .get("http://localhost:3000/booking/unavailable");

        Assertions.assertEquals(200, response.getStatusCode());
        Assertions.assertEquals(0, response.as(List.class).size());
    }

    @Test
    public void getPartialQueryAvailableRoomsByDate() {
        LocalDate checkindate = LocalDate.of(1990, Month.FEBRUARY, 1);
        LocalDate checkoutdate = LocalDate.of(1990, Month.FEBRUARY, 2);

        Booking bookingPayload = new Booking.BookingBuilder()
                .setRoomid(2)
                .setFirstname("Mark")
                .setLastname("Winteringham")
                .setDepositpaid(true)
                .setCheckin(checkindate)
                .setCheckout(checkoutdate)
                .setEmail("mark@mwtestconsultancy.co.uk")
                .setPhone("01292123456")
                .build();

        given()
            .contentType(ContentType.JSON)
            .body(bookingPayload)
            .when()
            .post("http://localhost:3000/booking/");

        Response response = given()
                .queryParam("checkin", "2022-02-01")
                .queryParam("checkout", "2022-02-05")
                .get("http://localhost:3000/booking/unavailable");

        Assertions.assertEquals(200, response.getStatusCode());
        Assertions.assertEquals(1, response.as(List.class).size());
    }

}
