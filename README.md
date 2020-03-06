# Express-Serverless

*Express-Serverless* is a backend API using express app.\
The passwords were encrypted with [bcrypt])("https://www.npmjs.com/package/bcrypt") and secured using [jasonwebtoken]("https://www.npmjs.com/package/jsonwebtoken").\
The express app was wrapped in [aws-serverless-express]("https://github.com/awslabs/aws-serverless-express") to deploly using lambda.\

## "/register"

* POST
    ```
        //sample request
        {
            "userid": [String],
            "username": [String],
            "password": [String],
            "token": [String]
        }

        - Success Response Code: 200
        - Error Response Code: 400
    ```
========================================================

## "/login"

* POST
    ```
        //sample request
        {
            "userid": [String],
            "password": [String]
        }

        - Success Response Code: 200
        - Error Response Code:  404 (user not found)
                                403 (incorrect password)

        -return
        {
            message: [String],
            token: [String]
        }
    ```
========================================================

## "/documents"

* GET
````
        //sample request
        {
            "token" : [String]
        }

        - Success Response Code: 200
        - Error Response Code:  401 (Authorization Error)

        - return: {documents: [ [String] ]}
````

* PUT
    ```
        {
            "token" : [String],
            "title":[String]",
  	        "content":[String]
        }

        - Success Response Code: 201
        - Error Response Code:  401 (Authorization Error)
                                403 (Document with same name exists. Use PATCH request for update)
   ```

* PATCH
    ```
        \\sample reques
        {
            "token" : [String],
            "title":[String]",
  	        "content":[String]
        }

        - Success Response Code: 200
        - Error Response Code:  401 (Authorization Error)
    ```

* DELETE
    ````
        --sample request--
        {
            "token" : [String],
            "title":[String]",
        }

        - Success Response Code: 200
        - Error Response Code:  401 (Authorization Error)
    ```

========================================================

## "/doc"

* GET
    ```
        //sample request
        {
            "token" : [String],
            "title": [String]
        }

        - Success Response Code: 200
        - Error Response Code:  401 (Authorization Error)
                                404 (Document not found)

        - return: {content: [String]}
    ```

========================================================

## "/adminlogin"
    ```
    - POST
        --sample request--
        {
            "userid": [String],
            "password": [String]
        }

        - Success Response Code: 200
        - Error Response Code:  404 (user not found)
                                403 (incorrect password)

        -return
        {
            message: [String],
            token: [String]
        }

    ```