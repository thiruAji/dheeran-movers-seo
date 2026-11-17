export const blogIndex = {
  slug: 'blog',
  h1: 'Moving guides for Singapore homes',
  title: 'Moving Guides for Singapore Homes | Dheeran Movers',
  description: 'Practical moving advice for Singapore households, from HDB preparation and lift access to packing and move-day planning.',
};

export const articles = [{
  slug: 'blog/hdb-moving-checklist-singapore',
  h1: 'The Singapore HDB Moving Checklist: What to Do Before, During and After Move Day',
  title: 'HDB Moving Checklist Singapore: Before, During & After | Dheeran Movers',
  description: 'A practical HDB moving checklist for Singapore: plan access, sort belongings, pack by room and prepare both addresses for move day.',
  excerpt: 'A calm HDB move starts with a clear inventory and a few early checks. Use this week-by-week guide to organise access, packing and handover.',
  intro: 'Moving between HDB flats is easier to coordinate when you plan the building details alongside the boxes. Lift use, loading access, corridor space and move timing can vary by block and estate. This checklist gives you a practical sequence to follow, while reminding you to confirm the current arrangements for your own addresses.',
  sections: [
    {
      heading: 'Four weeks before: make the move easier to scope',
      paragraphs: [
        'Start with the two addresses, your preferred date and a room-by-room inventory. List large furniture, appliances, fragile items and anything unusually heavy or awkward to carry. Note what is going to the new flat, what will be stored, and what you plan to dispose of separately. A clear list helps you ask for a quotation that reflects the work you actually need.',
        'Walk through both flats and note the access. Record the floors, lift availability, stairs, distance from the loading point and any narrow turns or doorways. Take photos of bulky items and tight access points if they are difficult to describe. Check with the relevant estate or building contact about current moving arrangements, vehicle access, lift use, timing and any booking process. Do not assume the rules are identical at both addresses.',
        'Choose a date with enough room for key collection, cleaning and handover. If your completion or tenancy schedule is still changing, tell the mover early and ask how a change of date would affect availability and the agreed scope.'
      ]
    },
    {
      heading: 'Two to three weeks before: confirm the scope and sort belongings',
      paragraphs: [
        'Request a quote using your inventory, both addresses, date and access notes. Ask which tasks are included, what you need to prepare, and whether packing, dismantling, storage or disposal can be discussed as part of the move. Confirm any assumptions in writing so everyone is working from the same plan.',
        'Sort one room at a time. Set aside items to keep, donate, sell, store or discard. This reduces the number of cartons to pack and makes the final inventory more accurate. For bulky items that will not be moving, arrange their disposal separately and check the relevant estate or town council guidance instead of leaving them in common areas.',
        'If you are packing yourself, gather sturdy cartons and suitable wrapping material. Put heavier belongings in smaller cartons, protect breakables individually, and avoid leaving loose items where they can shift. Keep cartons manageable for you to lift and label them on more than one side.'
      ]
    },
    {
      heading: 'One week before: pack by room and confirm access',
      paragraphs: [
        'Pack items you will not need during the final week. Label each carton with its destination room and a short description, such as “kitchen — cookware”. Mark fragile cartons clearly and keep them separate from heavy items. Make a simple list of cartons and major furniture so you can check what leaves and arrives.',
        'Confirm lift reservations, loading arrangements, vehicle entry and timing with the relevant contacts. Share any restrictions or changes with the moving team. Make sure keys, access cards and contact numbers will be available at both ends. If someone else is helping at the new flat, agree who will direct the placement of furniture and cartons.',
        'Prepare a small essentials bag that travels with you: identification and documents, medication, chargers, basic toiletries, a change of clothes, water and items needed for children or pets. Keep valuables and important papers with you rather than placing them in the moving inventory.'
      ]
    },
    {
      heading: 'The day before: leave clear paths and check the details',
      paragraphs: [
        'Finish packing and keep walkways clear. Disconnect and empty appliances only when it is safe and appropriate to do so, following the appliance instructions. If anything needs special handling or has changed since the quote, contact the mover before the crew arrives. Last-minute additions can affect space, timing or the agreed scope.',
        'Reconfirm the arrival time, loading point and access contact. Put aside anything that is not travelling with the movers. Do a quick room-by-room check of cupboards, storage areas and balconies, while keeping items needed for cleaning or handover accessible.'
      ]
    },
    {
      heading: 'Move day: guide the work at both flats',
      paragraphs: [
        'Have one person available to answer questions at collection and, if possible, another at delivery. Point out fragile pieces, cartons that need to stay upright and anything that should not be loaded. Keep building routes unobstructed and follow the confirmed lift and loading arrangements.',
        'At the new flat, direct items to their labelled rooms before they are set down. Check cupboards and corners at the old address before leaving, then review the delivered items against your list. Raise questions promptly and keep a copy of the written quotation and any agreed changes.'
      ]
    },
    {
      heading: 'A short HDB moving checklist to save',
      list: [
        'Confirm both addresses, date and building access arrangements.',
        'Prepare a room-by-room inventory and photos of bulky or awkward items.',
        'Separate belongings for moving, storage, donation and disposal.',
        'Agree the moving scope and inclusions before confirming the booking.',
        'Label cartons by room and set aside documents, valuables and daily essentials.',
        'Keep a contact available at collection and delivery, then check each room before leaving.'
      ],
      paragraphs: ['The exact requirements depend on your block, the items involved and the moving arrangements. Check details with the relevant property contacts and ask your mover to confirm the job scope, timing and any additional charges before move day.']
    }
  ],
  related: ['hdb-moving-services', 'hdb-movers-tampines', 'packing-services-singapore', 'moving-quotation-singapore']
}];

export const articleBySlug = Object.fromEntries(articles.map((article) => [article.slug, article]));
