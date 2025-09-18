{% from "src/templates/macros.jinja" import summary_card, translations %}

## Summary

{{ summary_card(
  "brachioradialis",
  "./src/muscles/brachioradialis/fig1.yml"
) }}

{{translations('brachioradialis')}}

## References

* [Wikipedia](https://en.wikipedia.org/wiki/Brachioradialis)
* {{ linktitle('gf') }}, p193
* Russian Book, 40, item 3.
* [TGB](../resources/trail-guide-to-the-body-flashcards.html) 5th p133,
  Flashcard p29

## Related Muscles

* {{ linktitle('trc') }}
* {{ linktitle('brc') }}
* Extensor carpi radialis longus
* Pronator teres
* Flexor carpi radialis
