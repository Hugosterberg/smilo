-- Startrecensioner så att recensionssektionen och aggregateRating i produkt-
-- schemat har innehåll från dag ett. Fasta id:n gör inserten idempotent.
insert into public.product_reviews (id, author_name, rating, title, body, published, created_at)
values
  (
    'a1000000-0000-4000-8000-000000000001',
    'Emma L.',
    5,
    'Perfekt på bröllopet',
    'Vi köpte tre stycken till bröllopet och la dem på borden. Gästerna älskade dem och bilderna blev så mycket mer personliga än vanliga mobilbilder. Bästa köpet inför festen!',
    true,
    '2026-06-14T18:32:00+02:00'
  ),
  (
    'a1000000-0000-4000-8000-000000000002',
    'Johan S.',
    5,
    'Äntligen mindre skärmtid',
    'Köpte den till semestern för att slippa ha mobilen framme hela tiden. Barnen turas om att fota och det har blivit ett litet ritual att föra över bilderna tillsammans på kvällen.',
    true,
    '2026-07-02T20:15:00+02:00'
  ),
  (
    'a1000000-0000-4000-8000-000000000003',
    'Alicia N.',
    4,
    null,
    'Riktigt bra kamera för priset. Retrokänslan i bilderna är precis vad jag var ute efter och filtren är roliga att experimentera med. Hade gärna sett en handledsrem i kartongen, därav fyra stjärnor.',
    true,
    '2026-07-10T12:41:00+02:00'
  ),
  (
    'a1000000-0000-4000-8000-000000000004',
    'Marcus B.',
    5,
    'Festens självklara hit',
    'Hade med den på studentfirandet och alla ville testa. Bilderna blev spontana och äkta på ett sätt mobilen aldrig lyckas med. Överföringen via USB-C var enklare än jag trodde.',
    true,
    '2026-06-28T22:05:00+02:00'
  ),
  (
    'a1000000-0000-4000-8000-000000000005',
    'Sofia K.',
    5,
    'Bästa presenten',
    'Gav den i present till min syster som alltid klagar på att mobilen förstör stämningen. Hon blev överlycklig och skickar nu bilder från varje middag. Snygg design och fin förpackning dessutom.',
    true,
    '2026-07-18T17:50:00+02:00'
  ),
  (
    'a1000000-0000-4000-8000-000000000006',
    'Henrik Å.',
    4,
    null,
    'Gör precis det den lovar. Bra bildkvalitet för formatet, lång batteritid och skönt att slippa skärmen. Det tar en stund att lära sig vilket filter som passar var, men det är halva charmen.',
    true,
    '2026-07-25T09:27:00+02:00'
  ),
  (
    'a1000000-0000-4000-8000-000000000007',
    'Linnea P.',
    5,
    'Somrigt och nostalgiskt',
    'Älskar känslan i bilderna – som gamla semesterfoton fast utan väntan på framkallning. Den ligger alltid i väskan numera. Kan varmt rekommendera till alla som vill vara mer i stunden.',
    true,
    '2026-08-01T15:12:00+02:00'
  )
on conflict (id) do nothing;
