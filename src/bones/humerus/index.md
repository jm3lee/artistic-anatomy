{% from "src/templates/macros.jinja" import translations, insertions, origins, bony_landmarks, anchor %}

## Illustrations

{{ figure("humerus-fig1") }}

{{ figure("humerus-fig2") }}

Source: [Wikipedia](https://upload.wikimedia.org/wikipedia/commons/a/ad/Gray207.png)


## Bony Landmarks

{{ bony_landmarks('humerus') }}

## Muscle Origins {{ anchor('origins') }}

{{ origins('humerus') }}

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('humerus') }}

{{ translations('humerus') }}

## Notes

{{ linktitle('subscp') }} is the only {{ linktitle('rotator-cuff') }} muscle that inserts on the anterior
surface of the humerus.

## References

- {{ linktitle('humerus-wikipedia') }}
