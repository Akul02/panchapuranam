# Build Stage

FROM maven:3.9-eclipse-temurin-21-alpine AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src src

RUN mvn clean package -DskipTests

# Runtime Stage

FROM eclipse-temurin:21-jre-jammy AS final

WORKDIR /app

COPY --from=build /app/target/panchapurnam.jar app.jar

COPY audios audios

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]



