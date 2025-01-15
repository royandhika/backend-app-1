# Project: Aircnc
# 📁 Collection: public 


## End-point: Create User (register)
Mendaftarkan username baru, akan membuat user dan profile (kosong).

Username, email, dan phone harus **unique** alias belum pernah terdaftar sebelumnya.
### Method: POST
>```
>{{url}}/users
>```
### Body (**raw**)

```json
{
    "username": "testceril",
    "password": "Zardar123!",
    "email": "hohohihe@gmail.com",
    "phone": "081325722971"
}
```

### Response: 200
```json
{
    "data": {
        "id": "cm5y0jw8m000281c2qw9pebgi",
        "username": "testceril"
    }
}
```

### Response: 400
```json
{
    "errors": "Username already exist"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Session (login)
Melakukan login; membuat session baru dengan user agent dan ip address saat ini. Mengembalikan token yang digunakan untuk _**Bearer Auth.**_
### Method: POST
>```
>{{url}}/sessions
>```
### Body (**raw**)

```json
{
    "username": "testnodi",
    "password": "Zardar123!"
}
```

### Response: 200
```json
{
    "data": {
        "id": "cm5y0gusj000181c2tbbkw8bq",
        "user_id": "cm5qy64nw000081osc5hokfxd",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtNXF5NjRudzAwMDA4MW9zYzVob2tmeGQiLCJ1c2VybmFtZSI6InRlc3Rub2RpIiwiaWF0IjoxNzM2OTUyMTU4LCJleHAiOjE3MzcxMjQ5NTh9.6T8Q0MqWzaC8h-rYRZPQJDZrXO1EvqTAq3Gtk_fVNcg",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtNXF5NjRudzAwMDA4MW9zYzVob2tmeGQiLCJ1c2VybmFtZSI6InRlc3Rub2RpIiwiaWF0IjoxNzM2OTUyMTU4LCJleHAiOjE3MzY5NTI0NTh9.BQATyd-q6SGgAHulGd-etvM_5u4dcSwH58nCgeug-F0"
    }
}
```

### Response: 401
```json
{
    "errors": "Username or password wrong"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Property
Lihat detail info dari satu properti
### Method: GET
>```
>{{url}}/properties/:propertyId
>```
### Response: 200
```json
{
    "data": {
        "id": "cm5v5nqr2000781ihrc8fri0g",
        "host_id": "cm5v5m6dq000281ihjqgf4uc1",
        "title": "Menteng Agung",
        "desc": "Kamar pusat kota",
        "address": "Jl. Gatotkaca II No. 2",
        "city": "Jakarta Pusat",
        "region": "DKI Jakarta",
        "country": "Indonesia",
        "price": "600000",
        "max_guests": 4,
        "bedrooms": 2,
        "bathrooms": 1,
        "created_at": "2025-01-13T14:44:39.065Z",
        "updated_at": "2025-01-13T14:44:39.065Z"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get All Property
Melihat semua property yang ada, di home aplikasi
### Method: GET
>```
>{{url}}/properties?city=Jakarta Pusat&sort=price&order=asc&page=1&limit=10
>```
### Query Params

|Param|value|
|---|---|
|city|Jakarta Pusat|
|sort|price|
|order|asc|
|page|1|
|limit|10|


### Response: 200
```json
{
    "meta": {
        "page": 1,
        "total_pages": 1,
        "count": 2
    },
    "data": [
        {
            "id": "cm5rxgnjr000f81464goba45i",
            "host_id": "cm5qy64nw000081osc5hokfxd",
            "title": "Oyo Sawah Besar",
            "desc": "Penginapan murah pilihan tepat",
            "address": "Jl. Arjuna I No. 18A",
            "city": "Jakarta Pusat",
            "region": "DKI Jakarta",
            "country": "Indonesia",
            "price": "350000",
            "max_guests": 2,
            "bedrooms": 1,
            "bathrooms": 1,
            "created_at": "2025-01-11T08:31:52.885Z",
            "updated_at": "2025-01-13T14:30:01.578Z"
        },
        {
            "id": "cm5v5nqr2000781ihrc8fri0g",
            "host_id": "cm5v5m6dq000281ihjqgf4uc1",
            "title": "Menteng Agung",
            "desc": "Kamar pusat kota",
            "address": "Jl. Gatotkaca II No. 2",
            "city": "Jakarta Pusat",
            "region": "DKI Jakarta",
            "country": "Indonesia",
            "price": "600000",
            "max_guests": 4,
            "bedrooms": 2,
            "bathrooms": 1,
            "created_at": "2025-01-13T14:44:39.065Z",
            "updated_at": "2025-01-13T14:44:39.065Z"
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: private 


## End-point: Get User Profile
Melihat detail profil pribadi.
### Method: GET
>```
>{{url}}/users/profiles/me
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{accessToken}}|


### Response: 200
```json
{
    "data": {
        "avatar": "https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png",
        "firstname": "Eko",
        "lastname": "Tri",
        "birthdate": "1998-12-12T00:00:00.000Z",
        "gender": 1,
        "city": null,
        "region": null,
        "country": "Indonesia",
        "role": "tenant"
    }
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update User Profile
Melakukan perubahan data profil pribadi, biasanya di user setting.

Semua parameter opsional.
### Method: PATCH
>```
>{{url}}/users/profiles/me
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{accessToken}}|


### Body (**raw**)

```json
{
    "avatar": "https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png",
    "firstname": "Eko",
    "lastname": "Tri",
    "gender": 1,
    "country": "Indonesia",
    "birthdate": "1998-12-12"
}
```

### Response: 200
```json
{
    "data": {
        "avatar": "https://images.vexels.com/content/145908/preview/male-avatar-maker-2a7919.png",
        "firstname": "Eko",
        "lastname": "Tri",
        "birthdate": "1998-12-12T00:00:00.000Z",
        "gender": 1,
        "city": null,
        "region": null,
        "country": "Indonesia",
        "role": "tenant"
    }
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get My Properties
Melihat semua properti pribadi yang sudah dipost sebelumnya.
### Method: GET
>```
>{{url}}/users/properties?sort=desc&order=created_at&limit=10&page=1
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{accessToken}}|


### Query Params

|Param|value|
|---|---|
|sort|desc|
|order|created_at|
|limit|10|
|page|1|


### Response: 200
```json
{
    "meta": {
        "page": 1,
        "total_pages": 1,
        "count": 2
    },
    "data": [
        {
            "id": "cm5rxgnjr000f81464goba45i",
            "host_id": "cm5qy64nw000081osc5hokfxd",
            "title": "Oyo Sawah Besar",
            "desc": "Penginapan murah pilihan tepat",
            "address": "Jl. Arjuna I No. 18A",
            "city": "Jakarta Pusat",
            "region": "DKI Jakarta",
            "country": "Indonesia",
            "price": "350000",
            "max_guests": 2,
            "bedrooms": 1,
            "bathrooms": 1,
            "created_at": "2025-01-11T08:31:52.885Z",
            "updated_at": "2025-01-13T14:30:01.578Z"
        },
        {
            "id": "cm5rxfe0g000d81466bgk9g5v",
            "host_id": "cm5qy64nw000081osc5hokfxd",
            "title": "Rukita Mabes",
            "desc": "Lokasi strategis dengan st. Mangga Besar",
            "address": "Jl. Dwiwarna Raya II",
            "city": "Jakarta Utara",
            "region": "DKI Jakarta",
            "country": "Indonesia",
            "price": "250000",
            "max_guests": 2,
            "bedrooms": 1,
            "bathrooms": 1,
            "created_at": "2025-01-11T08:30:53.872Z",
            "updated_at": "2025-01-11T08:30:53.872Z"
        }
    ]
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get My Specific Property
Melihat detail satu properti pribadi menggunakan property_id dari url.
### Method: GET
>```
>{{url}}/users/properties/:propertyId
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{accessToken}}|


### Response: 200
```json
{
    "data": {
        "id": "cm5rxgnjr000f81464goba45i",
        "host_id": "cm5qy64nw000081osc5hokfxd",
        "title": "Oyo Sawah Besar",
        "desc": "Penginapan murah pilihan tepat",
        "address": "Jl. Arjuna I No. 18A",
        "city": "Jakarta Pusat",
        "region": "DKI Jakarta",
        "country": "Indonesia",
        "price": "350000",
        "max_guests": 2,
        "bedrooms": 1,
        "bathrooms": 1,
        "created_at": "2025-01-11T08:31:52.885Z",
        "updated_at": "2025-01-13T14:30:01.578Z"
    }
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Refresh Session
Refresh access token yang sudah kadaluarsa dengan menukarkan refresh token di cookie.

Outputnya berupa access token dan refresh token yang baru.
### Method: POST
>```
>{{url}}/sessions/refresh
>```
### Response: 200
```json
{
    "data": {
        "user_id": "cm5qy64nw000081osc5hokfxd",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtNXF5NjRudzAwMDA4MW9zYzVob2tmeGQiLCJ1c2VybmFtZSI6InRlc3Rub2RpIiwiaWF0IjoxNzM2OTUyNjg1LCJleHAiOjE3MzcxMjU0ODV9.qKQQsSusoblYTlVE0UJRX7iCQ0TNhSW5VOR_kzR6G7I",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtNXF5NjRudzAwMDA4MW9zYzVob2tmeGQiLCJ1c2VybmFtZSI6InRlc3Rub2RpIiwiaWF0IjoxNzM2OTUyNjg1LCJleHAiOjE3MzY5NTI5ODV9.INTlSrmqXUCbbZWpNp_alzVposlrQhKH6JPbvHgW67A"
    }
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Session (logout)
Menghapus session saat ini di device saat ini.
### Method: DELETE
>```
>{{url}}/sessions
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{accessToken}}|


### Response: 200
```json
{
    "data": {
        "count": 1
    },
    "message": "Logout success"
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete All Session (logout all)
Menghapus semua session atas satu user_id dari semua device.
### Method: DELETE
>```
>{{url}}/sessions/all
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{accessToken}}|


### Response: 200
```json
{
    "data": {
        "count": 3
    },
    "message": "Logout success"
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Create Property
Mendaftarkan property baru untuk diiklankan.
### Method: POST
>```
>{{url}}/properties
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{accessToken}}|


### Body (**raw**)

```json
{
    "title": "Temanggung Villa", //string
    "desc": "part of Serilia hotel properties", //text, optional
    "address": "Jl. Kelas 3 No. 30", //string
    "city": "Temanggung", //string, optional
    "region": "Jawa Tengah", //string, optional
    "country": "Indonesia", //string, optional
    "price": 400000, //decimal
    "max_guests": 3, //int
    "bedrooms": 1, //int
    "bathrooms": 1 //int
}
```

### Response: 200
```json
{
    "data": {
        "id": "cm5y0wqxv000b81c2qos9wgk7",
        "host_id": "cm5qy64nw000081osc5hokfxd",
        "title": "Temanggung Villa"
    }
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update Property
Mengubah detail informasi property.
### Method: PATCH
>```
>{{url}}/properties/:propertyId
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{accessToken}}|


### Body (**raw**)

```json
{
    "price": 450000
}
```

### Response: 200
```json
{
    "data": {
        "id": "cm5y0wqxv000b81c2qos9wgk7",
        "host_id": "cm5qy64nw000081osc5hokfxd",
        "title": "Temanggung Villa",
        "desc": "part of Serilia hotel properties",
        "address": "Jl. Kelas 3 No. 30",
        "city": "Temanggung",
        "region": "Jawa Tengah",
        "country": "Indonesia",
        "price": "450000",
        "max_guests": 3,
        "bedrooms": 1,
        "bathrooms": 1,
        "created_at": "2025-01-15T14:54:59.682Z",
        "updated_at": "2025-01-15T14:56:34.444Z"
    }
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Property
Menghapus / Menutup property dari listing.
### Method: DELETE
>```
>{{url}}/properties/:propertyId
>```
### Headers

|Content-Type|Value|
|---|---|
|Authorization|Bearer {{accessToken}}|


### Response: 200
```json
{
    "data": {
        "id": "cm5y0wqxv000b81c2qos9wgk7",
        "host_id": "cm5qy64nw000081osc5hokfxd",
        "title": "Temanggung Villa",
        "desc": "part of Serilia hotel properties",
        "address": "Jl. Kelas 3 No. 30",
        "city": "Temanggung",
        "region": "Jawa Tengah",
        "country": "Indonesia",
        "price": "450000",
        "max_guests": 3,
        "bedrooms": 1,
        "bathrooms": 1,
        "created_at": "2025-01-15T14:54:59.682Z",
        "updated_at": "2025-01-15T14:56:34.444Z"
    }
}
```

### Response: 401
```json
{
    "errors": "Unauthorized"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
