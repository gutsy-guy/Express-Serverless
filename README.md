"/register"
    - POST
        --sample request--
        {
            "userid": [String],
            "username": [String],
            "password": [String]
        }

        - Success Response Code: 200
        - Error Response Code: 400
    
========================================================
"/login"
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

========================================================
"/documents"
    - GET
         --sample request--
        {
            "token" : [String]
        }

        - Success Response Code: 200
        - Error Response Code:  401 (Authorization Error)

        - return: {documents: [ [String] ]}


    - PUT
        {
            "token" : [String],
            "title":[String]",
  	        "content":[String]
        }

        - Success Response Code: 200
        - Error Response Code:  401 (Authorization Error)

    - PATCH
        --sample request--
        {
            "token" : [String],
            "title":[String]",
  	        "content":[String]
        }

        - Success Response Code: 200
        - Error Response Code:  401 (Authorization Error)

    - DELETE
        --sample request--
        {
            "token" : [String],
            "title":[String]",
        }

        - Success Response Code: 200
        - Error Response Code:  401 (Authorization Error)


========================================================
"/document"
    - GET
         --sample request--
        {
            "token" : [String],
            "title": [String]
        }

        - Success Response Code: 200
        - Error Response Code:  401 (Authorization Error)
                                404 (Document not found)

        - return: {content: [String]}