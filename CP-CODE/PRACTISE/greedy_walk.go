// Placeholder Go solution for practice
package main
import (
    "bufio"
    "fmt"
    "os"
)
func main(){
    in:=bufio.NewReader(os.Stdin)
    var n int
    if _,err:=fmt.Fscan(in,&n); err!=nil {return}
    fmt.Println(n+1)
}
