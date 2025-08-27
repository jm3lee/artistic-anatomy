{% from "templates/insertions.jinja" import insertions %}
{% from "templates/origins.jinja" import origins %}

## Illustrations

<figure>
  <a title=
  "Henry Vandyke Carter, Public domain, via Wikimedia Commons"
  href="https://commons.wikimedia.org/wiki/File:Gray258.png"><img alt="Gray258"
  src=
  "https://artisticanatomy.sfo3.cdn.digitaloceanspaces.com/grays/Gray258.webp"/>
  </a>
  <figcaption>
    <a href=
    "https://commons.wikimedia.org/wiki/File:Gray258.png">Henry
    Vandyke Carter</a>, Public domain, via Wikimedia Commons
  </figcaption>
</figure>

## Muscle Origins {{'{#origins}'}}

{{ origins('tibia') }}

## Muscle Insertions {{'{#insertions}'}}

{{ insertions('tibia') }}

## Notes

No other major muscles insert directly on the tibia itself.
The **tibialis posterior** and **soleus** originate on the posterior surface of
the tibia (and fibula/interosseous membrane) but insert primarily on the tarsal
bones rather than the tibia.

## References

* [Tibia (Wikipedia)](https://en.wikipedia.org/wiki/Tibia)
* Richer, plate 27
