{% from "src/templates/macros.jinja" import insertions, bony_landmarks, anchor %}

## Bony Landmarks

{{ bony_landmarks('radius') }}

## Muscle Insertions {{ anchor('insertions') }}

{{ insertions('radius') }}

## References

* {{ linktitle('radius-bone-wikipedia') }}
* {{ linktitle('gf') }}, 24-25.
