f arr =
  let sumOdds arr sum = case arr of
        []     -> sum
        [ x ]  -> sum + checkOdd x
        x : xs -> sumOdds xs $ checkOdd x + sum
  in  sumOdds arr 0
 where
  checkOdd x | x `mod` 2 == 0 = 0
             | otherwise      = x

-- f arr = foldl (+) 0 [ x | x <- arr, x `mod` 2 /= 0 ]

main :: IO ()
main = do
  let result = f [1 .. 10]
  print result
