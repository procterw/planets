library(jsonlite)

planets <- read.csv("~/Desktop/planets.csv", stringsAsFactors=FALSE)

output <- list()

len <- dim(planets)[[1]] / 2

for (i in 1:len) {
  
  i <- (i * 2) - 1
  
  # Name of current planet
  planet <- planets$planet[[i]]
  
  # Initialize list for planet
  pList <- list()
  
  for (j in 2:dim(planets)[[2]]) {
    cname <- names(planets)[[j]]
    pList[[cname]] <- c(planets[i,j], planets[i+1, j])
  }
  
  # MARRY THEM
  output[[planet]] = pList
  
}

json <- toJSON(output)
