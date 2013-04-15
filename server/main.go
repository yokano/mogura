package yokano-apps

import(
	"net/http"
)

func init() {
	http.HandleFunc("/getranking", getRanking)
	http.HandleFunc("/putranking", putRanking)
}

func getRanking(w http.ResponseWriter, r *http.Request) {
	
}

func putRanking(w http.ResponseWriter, r *http.Request) {
	
}