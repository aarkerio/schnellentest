

curl -X POST -H "Accept: application/json" --data "param1=value1&param2=value2" "http://localhost:3000/api/v1/tests/listing/2"

--data "param1=value1&param2=value2"

curl -X PUT "http://localhost:3000/_river/mybooks/_meta" -d'
{
"type": "jdbc",
"jdbc": {
"driver": "org.postgresql.Driver",
"url": "jdbc:postgresql://localhost:5432/booktown",
"user": "postgres",
"password": "postgres",
"index": "booktown",
"type": "books",
"sql": "select * from authors"
}
}'

