{% from "src/templates/macros.jinja" import summary_card %}

## Summary

{{ summary_card(
  "flexor-digitorum-profundus",
  "./src/muscles/flexor-digitorum-profundus/fig1.yml"
) }}

The flexor digitorum profundus lies deep to the
{{ link('flexor-digitorum-superficialis') }}. Its broad origin on the ulna and
interosseous membrane sends four tendons to the fingers. Each tendon passes
through the split in the superficial flexor to insert on the distal phalanx,
allowing the fingertips to bend.

It works with {{ link('flexor-digitorum-superficialis') }} to flex the digits
and is an antagonist to the {{ link('extensor-digitorum') }}.

## References

- [Wikipedia](https://en.wikipedia.org/wiki/Flexor_digitorum_profundus_muscle)
