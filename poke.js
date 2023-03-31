import mysql from 'mysql2'

class Pokemon {
  constructor(name, type, level){
    this.name =name 
    this.type = type
    this.level = level
  }

  get info(){
    return `이름 : ${this._name}, 타입 : ${this._type}, 레벨 : ${this._level}`;
  }

  set name(value){
    if (typeof(value) === 'string') {
      this._name=value
    } else {
      console.log('이름은 문자열로 입력해주세요.')
    }
  }

  set type(value){
    if (typeof(value) === 'string') {
      this._type=value
    } else {
      console.log('타입은 문자열로 입력해주세요.')
    }
  }
  
  set level(value){
    if (typeof(value) === 'number') {
      this._level=value
    } else {
      console.log('레벨은 숫자열로 입력해주세요.')
    }
  }
}//class pokemon 끝부분

const dbconfig={
  host : 'localhost',
  user : 'root',
  password : 'dltpals123!!',
  database : 'prolog',
  port : 3306,
  connectionLimit : 5,
  waitForConnections:true
};

function convertPokemonToJSON(pokemon){
  return JSON.stringify({
    name : pokemon._name,
    type : pokemon._type,
    level : pokemon._level
  });
};

//포켓몬 정보를 DB 테이블에 저장하는 함수
function savePokemonJSONToDatabase(pokemonJSON){
  //데이터베이스 연결 생성
  const connection = mysql.createConnection(dbconfig);

  //연결시작
  connection.connect((err) => {
    if(err){
      console.error('연결실패',err);
      return;
    } 
    console.log(`${dbconfig.port} 포트로 연결 성공`);
    
    //JSON 데이터 파싱하여 결과적으로 다시 객체가 된다.
    const pokemonData = JSON.parse(pokemonJSON);

    //포켓몬 정보 삽입 쿼리
    const query = 'INSERT INTO pokemon (name, type, level) VALUES (?,?,?)';
    //여기서 ?는 '값'이 아니라 '값의 위치'를 의미하는 '함수의 매개변수'와 같다.

    const values = [pokemonData.name, pokemonData.type, pokemonData.level];

    //쿼리 실행
    connection.query(query, values, (err, results)=>{
      if (err) {
        console.error('쿼리실행 실패', err);
        return;
      }
      console.log('결과물 확인', results);

      //연결 종료
      connection.end();
    })
  }) //connetion 끝
} //savePokemonJSONToDatabase 끝

const newpokemon = new Pokemon('삐츄','전기',5);
const newpokemonJSON = convertPokemonToJSON(newpokemon);
savePokemonJSONToDatabase(newpokemonJSON);