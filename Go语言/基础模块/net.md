<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [TCP 服务器](#tcp-服务器)

<!-- /code_chunk_output -->


## TCP 服务器

```go
package main

import (
    "bufio"
    "fmt"
    "log"
    "net"
    "strings"
)

func main() {
    listener, err := net.Listen("tcp", ":8090")
    if err != nil {
        log.Fatal("Error listening:", err)
    }

    defer listener.Close()

    for {

        conn, err := listener.Accept()
        if err != nil {
            log.Println("Error accepting conn:", err)
            continue
        }

        go handleConnection(conn)
    }
}

func handleConnection(conn net.Conn) {
    defer conn.Close()
    reader := bufio.NewReader(conn)
    message, err := reader.ReadString('\n')
    if err != nil {
        log.Printf("Read error: %v", err)
        return
    }
    ackMsg := strings.ToUpper(strings.TrimSpace(message))
    response := fmt.Sprintf("ACK: %s\n", ackMsg)
    _, err = conn.Write([]byte(response))
    if err != nil {
        log.Printf("Server write error: %v", err)
    }
}
```