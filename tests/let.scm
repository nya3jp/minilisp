(define (f)
  (let ((a 2))
    (let ((a 3) (b a))
      b)))

(print (= 2 (f)))