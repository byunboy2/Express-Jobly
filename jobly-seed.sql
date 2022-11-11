-- both test users have the password "password"

INSERT INTO users (username, password, first_name, last_name, email, is_admin)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'joel@joelburton.com',
        FALSE),
       ('testadmin',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'Admin!',
        'joel@joelburton.com',
        TRUE);

INSERT INTO companies (handle,
                       name,
                       num_employees,
                       description,
                       logo_url)
VALUES ('bauer-gallagher', 'Bauer-Gallagher', 862,
        'Difficult ready trip question produce produce someone.', NULL),
       ('edwards-lee-reese', 'Edwards, Lee and Reese', 744,
        'To much recent it reality coach decision Mr. Dog language evidence minute either deep situation pattern. Other cold bad loss surface real show.',
        '/logos/logo2.png'),
       ('hall-davis', 'Hall-Davis', 749,
        'Adult go economic off into. Suddenly happy according only common. Father plant wrong free traditional.',
        '/logos/logo2.png'),
       ('watson-davis', 'Watson-Davis', 819, 'Year join loss.',
        '/logos/logo3.png'),
       ('baker-santos', 'Baker-Santos', 225,
        'Compare certain use. Writer time lay word garden. Resource task interesting voice.',
        '/logos/logo3.png'),
       ('erickson-inc', 'Erickson Inc', 267,
        'Interesting environment owner beautiful school politics. General friend hair player dinner last administration teacher.',
        '/logos/logo4.png'),
       ('norman-harvey', 'Norman-Harvey', NULL,
        'Drop along test material education. Opportunity forget campaign federal certainly total hair.',
        '/logos/logo4.png'),
       ('boyd-evans', 'Boyd-Evans', 698,
        'Build respond generation tree. No five keep. Happy medical back fine focus suffer modern.',
        '/logos/logo4.png'),
       ('mitchell-brown', 'Mitchell-Brown', 288,
        'Republican truth church generation voice price issue.',
        '/logos/logo1.png'),
       ('russo-gillespie-conrad', 'Russo, Gillespie and Conrad', 398,
        'South sound knowledge guy. Up I size anyone issue drop. Agent light significant mouth while.',
        '/logos/logo2.png'),
       ('ingram-ferguson-rubio', 'Ingram, Ferguson and Rubio', 753,
        'Human summer field mean impact could exactly. Business read north project will. Left dream use Democrat.',
        '/logos/logo3.png'),
       ('anderson-arias-morrow', 'Anderson, Arias and Morrow', 245,
        'Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.',
        '/logos/logo3.png'),
       ('jackson-sons', 'Jackson and Sons', 649,
        'President couple political sit create.', '/logos/logo4.png'),
       ('miller-woods-hernandez', 'Miller, Woods and Hernandez', 444,
        'Including theory protect reveal energy himself probably. Test leave mother area however.',
        '/logos/logo4.png'),
       ('arnold-berger-townsend', 'Arnold, Berger and Townsend', 795,
        'Kind crime at perhaps beat. Enjoy deal purpose serve begin or thought. Congress everything miss tend.',
        NULL),
       ('davis-davis', 'Davis-Davis', 23,
        'Career participant difficult. Decide claim particular century society. Question growth two staff.',
        NULL),
       ('smith-llc', 'Smith LLC', 908,
        'Statement use per mission method. Order truth method.', NULL),
       ('morgan-sullivan', 'Morgan-Sullivan', 409,
        'Own once artist part put authority wait. Focus free even. Why friend civil visit.',
        NULL),
       ('taylor-yu-lee', 'Taylor, Yu and Lee', 226,
        'Down bag serve. Officer season company.', '/logos/logo2.png'),
       ('scott-smith', 'Scott-Smith', 993,
        'Room newspaper foot. Student daughter their themselves top almost near. Wait time recently it street follow medical nothing.',
        '/logos/logo2.png'),
       ('garcia-ray', 'Garcia-Ray', 217,
        'Laugh low follow fear. Politics main size fine.', '/logos/logo2.png'),
       ('logan-miller', 'Logan-Miller', 429,
        'Pattern hand where never. Social across ability which structure.',
        NULL),
       ('hudson-inc', 'Hudson Inc', 627,
        'End now meet staff. Long government force why bar. Provide bring hope staff almost many be a.',
        NULL),
       ('rivas-llc', 'Rivas LLC', 552,
        'Would road lot research wide mouth. Resource along office drug.',
        NULL),
       ('garner-michael', 'Garner-Michael', 940,
        'Necessary thousand parent since discuss director. Visit machine skill five the.',
        NULL),
       ('owen-newton', 'Owen-Newton', 953,
        'Red compare try way. Bed standard again number wrong force. Stop exactly agent product economy someone. North describe site manager employee customer.',
        NULL),
       ('foster-rice', 'Foster-Rice', 901,
        'Either relate himself. Source TV data one general. Actually than seat eight.',
        NULL),
       ('moore-plc', 'Moore PLC', 100,
        'Magazine thing eight shake window might they organization. Environmental it bag green.',
        NULL),
       ('ayala-buchanan', 'Ayala-Buchanan', 309,
        'Make radio physical southern. His white on attention kitchen market upon. Represent west open seven. Particularly subject billion much score thank bag somebody.',
        NULL),
       ('willis-henson-miller', 'Willis, Henson and Miller', 821,
        'About dream practice. Father significant senior health within four.',
        NULL),
       ('stone-stewart', 'Stone-Stewart', 459,
        'Require successful family but. Traditional article late eight lose common send budget. Better opportunity law country various represent strong probably.',
        NULL),
       ('wiggins-frederick-boyer', 'Wiggins, Frederick and Boyer', 298,
        'Institution structure say argue bit. Each option high executive easy pattern. Majority white hour there reach drive produce.',
        '/logos/logo2.png'),
       ('reynolds-greene', 'Reynolds-Greene', 343,
        'Effect win area officer office economy. Congress travel would resource difficult. Nice president mind dinner.',
        '/logos/logo2.png'),
       ('perez-miller', 'Perez-Miller', 298,
        'Space one approach wife son. Themselves give necessary follow employee return feel. Step animal doctor sign water early.',
        '/logos/logo4.png'),
       ('burton-ltd', 'Burton Ltd', 610,
        'Cover couple speech bar cell measure movement finally. Nation pull inside.',
        '/logos/logo4.png'),
       ('gillespie-smith', 'Gillespie-Smith', 302,
        'Candidate ability democratic make drug. Player themselves like front. Over through style loss win very when.',
        '/logos/logo1.png'),
       ('martinez-daniels', 'Martinez-Daniels', 12,
        'Five source market nation. Drop foreign raise pass.',
        '/logos/logo4.png'),
       ('jackson-davila-conley', 'Jackson, Davila and Conley', 813,
        'Consider with build either.', '/logos/logo4.png'),
       ('salas-group', 'Salas Group', 624,
        'Central whom mouth partner bring newspaper special city. Show second cost newspaper can early play.',
        '/logos/logo4.png'),
       ('thomas-sons', 'Thomas and Sons', 51,
        'Book detail scene continue. Art strategy because list two.',
        '/logos/logo1.png'),
       ('mejia-scott-ryan', 'Mejia, Scott and Ryan', NULL,
        'General traditional late situation discussion dog. Before best up strategy about direction.',
        '/logos/logo4.png'),
       ('mueller-moore', 'Mueller-Moore', 932,
        'Edge may report though least pressure likely. Cost short appear program hair seven.',
        '/logos/logo2.png'),
       ('pugh-ltd', 'Pugh Ltd', 87, 'Believe reflect perform TV son.',
        '/logos/logo2.png'),
       ('carr-wells-jones', 'Carr, Wells and Jones', 27,
        'Human medical throw book pick possible. Maybe yeah word beat treatment impact campaign.',
        '/logos/logo3.png'),
       ('hall-mills', 'Hall-Mills', 266,
        'Change stage tell note hundred. Worry where program wait.',
        '/logos/logo3.png'),
       ('robbins-marsh-martin', 'Robbins, Marsh and Martin', 709,
        'Now never worry usually another ability concern hair. Fly lot six protect participant. Teach through head.',
        '/logos/logo3.png'),
       ('sellers-bryant', 'Sellers-Bryant', 369,
        'Language discussion mission soon wait according executive. Financial say husband anyone money politics. Dinner action purpose mouth environment I white.',
        '/logos/logo3.png'),
       ('humphrey-llc', 'Humphrey LLC', 678,
        'Agent actually able paper nor. Tell then court full agree without assume.',
        '/logos/logo4.png'),
       ('graham-herring-lane', 'Graham, Herring and Lane', 188,
        'Enough attack return. Fall gas someone her another point those. Star public painting show concern.',
        '/logos/logo4.png'),
       ('weber-hernandez', 'Weber-Hernandez', 681,
        'Contain product south picture scientist.', '/logos/logo4.png');

INSERT INTO jobs (title, salary, equity, company_handle)
VALUES ('Conservator, furniture', 110000, 0, 'watson-davis'),
       ('Information officer', 200000, 0, 'hall-mills'),
       ('Consulting civil engineer', 60000, 0, 'sellers-bryant'),
       ('Early years teacher', 55000, 0, 'perez-miller'),
       ('Intelligence analyst', 77000, 0, 'garner-michael'),
       ('Surveyor, building', 144000, 0, 'russo-gillespie-conrad'),
       ('Technical brewer', 157000, 0, 'anderson-arias-morrow'),
       ('Control and instrumentation engineer', 171000, 0, 'salas-group'),
       ('Photographer', 198000, 0, 'davis-davis'),
       ('Multimedia programmer', 192000, 0, 'graham-herring-lane'),
       ('English as a foreign language teacher', 111000, 0,
        'russo-gillespie-conrad'),
       ('Passenger transport manager', 70000, 0, 'rivas-llc'),
       ('Psychologist, clinical', 172000, 0, 'hudson-inc'),
       ('Financial planner', 115000, 0, 'taylor-yu-lee'),
       ('Scientist, forensic', 50000, 0, 'foster-rice'),
       ('Occupational therapist', 183000, 0, 'garcia-ray'),
       ('Ophthalmologist', 135000, 0, 'hall-mills'),
       ('Embryologist, clinical', 138000, 0, 'anderson-arias-morrow'),
       ('Marine scientist', 54000, 0, 'scott-smith'),
       ('Tourist information centre manager', 88000, 0, 'foster-rice'),
       ('Interior and spatial designer', 177000, 0, 'gillespie-smith'),
       ('Surveyor, rural practice', 193000, 0, 'weber-hernandez'),
       ('Colour technologist', 81000, 0, 'burton-ltd'),
       ('Technical brewer', 77000, 0, 'thomas-sons'),
       ('Pharmacist, hospital', 194000, 0, 'boyd-evans'),
       ('Medical sales representative', 125000, 0, 'jackson-davila-conley'),
       ('Energy engineer', 62000, 0, 'norman-harvey'),
       ('Research officer, government', 167000, 0, 'mejia-scott-ryan'),
       ('Barrister', 130000, 0, 'stone-stewart'),
       ('Loss adjuster, chartered', 76000, 0, 'bauer-gallagher'),
       ('Database administrator', 79000, 0, 'willis-henson-miller'),
       ('IT consultant', 59000, 0, 'gillespie-smith'),
       ('Museum/gallery conservator', 82000, 0, 'mejia-scott-ryan'),
       ('Engineering geologist', 170000, 0, 'garcia-ray'),
       ('Television production assistant', 125000, 0, 'logan-miller'),
       ('Accountant, chartered certified', 175000, 0, 'stone-stewart'),
       ('Merchant navy officer', 106000, 0, 'mitchell-brown'),
       ('Medical physicist', 84000, 0, 'perez-miller'),
       ('Podiatrist', 68000, NULL, 'reynolds-greene'),
       ('Nurse, children''s', 162000, NULL, 'humphrey-llc'),
       ('Teacher, music', 127000, NULL, 'ingram-ferguson-rubio'),
       ('Occupational hygienist', 79000, NULL, 'reynolds-greene'),
       ('Research officer, political party', 134000, NULL, 'garner-michael'),
       ('Therapist, occupational', 82000, NULL, 'mejia-scott-ryan'),
       ('Teacher, secondary school', 127000, NULL, 'sellers-bryant'),
       ('Scientist, product/process development', 106000, NULL, 'scott-smith'),
       ('Astronomer', 143000, NULL, 'watson-davis'),
       ('Counsellor', NULL, 0, 'owen-newton'),
       ('Financial controller', NULL, 0, 'sellers-bryant'),
       ('Advertising account executive', NULL, 0, 'thomas-sons'),
       ('Buyer, industrial', NULL, NULL, 'reynolds-greene'),
       ('Interpreter', 55000, 0, 'hudson-inc'),
       ('Best boy', NULL, 0, 'jackson-sons'),
       ('Freight forwarder', 183000, 0, 'hudson-inc'),
       ('Designer, jewellery', NULL, 0, 'weber-hernandez'),
       ('Tree surgeon', NULL, 0.001, 'hall-davis'),
       ('Management consultant', 183000, 0, 'edwards-lee-reese'),
       ('Ergonomist', 160000, 0, 'bauer-gallagher'),
       ('Psychologist, forensic', 176000, 0, 'boyd-evans'),
       ('Architectural technologist', 57000, 0, 'owen-newton'),
       ('Patent attorney', 143000, 0, 'foster-rice'),
       ('Art gallery manager', NULL, 0.085, 'anderson-arias-morrow'),
       ('Engineer, chemical', 81000, 0, 'russo-gillespie-conrad'),
       ('Speech and language therapist', 159000, 0, 'gillespie-smith'),
       ('Orthoptist', 200000, 0, 'perez-miller'),
       ('Camera operator', 130000, 0, 'arnold-berger-townsend'),
       ('Field trials officer', 137000, 0, 'davis-davis'),
       ('Transport planner', NULL, NULL, 'reynolds-greene'),
       ('Bonds trader', NULL, NULL, 'mitchell-brown'),
       ('Editor, magazine features', 118000, 0.002, 'foster-rice'),
       ('Applications developer', 84000, 0.091, 'sellers-bryant'),
       ('Clothing/textile technologist', 171000, 0.041, 'smith-llc'),
       ('Secretary/administrator', 172000, 0.096, 'jackson-sons'),
       ('Field seismologist', 62000, 0.064, 'martinez-daniels'),
       ('Engineer, materials', 185000, 0.081, 'garner-michael'),
       ('Race relations officer', 97000, 0.065, 'bauer-gallagher'),
       ('Engineering geologist', 89000, 0.043, 'ayala-buchanan'),
       ('Aeronautical engineer', 135000, 0.078, 'norman-harvey'),
       ('Development worker, community', 192000, 0.047, 'weber-hernandez'),
       ('Speech and language therapist', 154000, 0.014, 'humphrey-llc'),
       ('Health promotion specialist', 72000, 0.010, 'burton-ltd'),
       ('Careers adviser', 57000, 0.051, 'carr-wells-jones'),
       ('Surveyor, minerals', 98000, 0.037, 'carr-wells-jones'),
       ('Forest/woodland manager', 156000, 0.030, 'carr-wells-jones'),
       ('Haematologist', 63000, 0.062, 'ayala-buchanan'),
       ('Advertising account executive', 130000, 0.064, 'thomas-sons'),
       ('Ship broker', 124000, 0.045, 'davis-davis'),
       ('Fisheries officer', 67000, 0.062, 'hall-davis'),
       ('Air cabin crew', 105000, 0.077, 'ingram-ferguson-rubio'),
       ('Financial trader', 153000, 0.012, 'garner-michael'),
       ('Paramedic', 122000, 0.047, 'baker-santos'),
       ('Historic buildings inspector/conservation officer', 129000, 0.052,
        'watson-davis'),
       ('Transport planner', 123000, 0.091, 'hudson-inc'),
       ('Public librarian', 115000, 0.099, 'norman-harvey'),
       ('Writer', 172000, 0.091, 'anderson-arias-morrow'),
       ('Designer, fashion/clothing', 81000, 0.026, 'garcia-ray'),
       ('Information systems manager', 123000, 0.100, 'arnold-berger-townsend'),
       ('Art gallery manager', 73000, 0.054, 'perez-miller'),
       ('Operational researcher', 167000, 0.020, 'ayala-buchanan'),
       ('Solicitor', 131000, 0.034, 'wiggins-frederick-boyer'),
       ('Intelligence analyst', 148000, 0, 'sellers-bryant'),
       ('Naval architect', 126000, 0, 'scott-smith'),
       ('Dealer', 175000, 0, 'hall-mills'),
       ('Multimedia programmer', 154000, NULL, 'owen-newton'),
       ('Psychologist, occupational', 190000, NULL, 'robbins-marsh-martin'),
       ('Leisure centre manager', 135000, NULL, 'edwards-lee-reese'),
       ('Television production assistant', 99000, NULL, 'edwards-lee-reese'),
       ('Historic buildings inspector/conservation officer', 135000, NULL,
        'rivas-llc'),
       ('Sports development officer', 102000, NULL, 'scott-smith'),
       ('Investment banker, corporate', 131000, NULL, 'ingram-ferguson-rubio'),
       ('Conservation officer, historic buildings', 168000, NULL,
        'robbins-marsh-martin'),
       ('Physicist, medical', 190000, NULL, 'humphrey-llc'),
       ('Press sub', 100000, NULL, 'erickson-inc'),
       ('Engineer, civil (contracting)', NULL, 0.018, 'moore-plc'),
       ('Therapist, music', 103000, 0.087, 'reynolds-greene'),
       ('Water engineer', NULL, 0.028, 'mejia-scott-ryan'),
       ('Engineer, energy', NULL, 0.048, 'arnold-berger-townsend'),
       ('Plant breeder/geneticist', NULL, 0.081, 'thomas-sons'),
       ('Oceanographer', NULL, 0.097, 'anderson-arias-morrow'),
       ('Clinical cytogeneticist', 152000, 0.027, 'mitchell-brown'),
       ('Nature conservation officer', 82000, 0.093, 'watson-davis'),
       ('Insurance underwriter', NULL, 0.008, 'hall-davis'),
       ('Chief of Staff', 110000, 0.016, 'scott-smith'),
       ('Surveyor, insurance', NULL, 0.066, 'foster-rice'),
       ('Surveyor, building control', NULL, NULL, 'reynolds-greene'),
       ('Trade mark attorney', NULL, NULL, 'mueller-moore'),
       ('Glass blower/designer', 126000, 0.099, 'anderson-arias-morrow'),
       ('Geochemist', 130000, 0.004, 'smith-llc'),
       ('Scientist, research (physical sciences)', 117000, 0.090,
        'ayala-buchanan'),
       ('Historic buildings inspector/conservation officer', 65000, 0.075,
        'mejia-scott-ryan'),
       ('Surveyor, insurance', 130000, 0.009, 'martinez-daniels'),
       ('Contractor', 89000, 0.065, 'mueller-moore'),
       ('Hydrologist', 50000, 0.097, 'wiggins-frederick-boyer'),
       ('Aeronautical engineer', 156000, 0.055, 'perez-miller'),
       ('Freight forwarder', 183000, 0.093, 'burton-ltd'),
       ('Engineer, materials', 140000, 0.057, 'mitchell-brown'),
       ('Product designer', 184000, 0.090, 'gillespie-smith'),
       ('Editor, film/video', 199000, 0.070, 'bauer-gallagher'),
       ('Fashion designer', 131000, 0.080, 'taylor-yu-lee'),
       ('Legal secretary', 155000, 0.080, 'pugh-ltd'),
       ('Financial risk analyst', 72000, 0.001, 'scott-smith'),
       ('Regulatory affairs officer', 96000, 0.061, 'logan-miller'),
       ('Ranger/warden', 86000, 0.095, 'ayala-buchanan'),
       ('Farm manager', 138000, 0.085, 'stone-stewart'),
       ('Primary school teacher', 142000, 0.036, 'moore-plc'),
       ('Quality manager', 138000, 0.002, 'russo-gillespie-conrad'),
       ('Radio producer', 99000, 0.038, 'mitchell-brown'),
       ('Music therapist', 100000, 0.058, 'taylor-yu-lee'),
       ('Farm manager', 68000, 0.049, 'morgan-sullivan'),
       ('Camera operator', 51000, 0.066, 'jackson-davila-conley'),
       ('Engineer, technical sales', 167000, 0.077, 'ingram-ferguson-rubio'),
       ('Ranger/warden', 145000, 0.046, 'jackson-davila-conley'),
       ('Lawyer', 162000, 0.072, 'hall-mills'),
       ('Estate manager/land agent', 94000, 0.008, 'jackson-davila-conley'),
       ('Orthoptist', 129000, 0.062, 'willis-henson-miller'),
       ('Recycling officer', 57000, 0.098, 'carr-wells-jones'),
       ('Scientist, research (life sciences)', 157000, 0.057, 'ayala-buchanan'),
       ('Armed forces technical officer', 136000, 0.012, 'scott-smith'),
       ('Public relations officer', 112000, 0.087, 'weber-hernandez'),
       ('Set designer', 132000, 0.055, 'russo-gillespie-conrad'),
       ('Accountant, chartered certified', 86000, 0.070, 'boyd-evans'),
       ('Special effects artist', 101000, 0.023, 'willis-henson-miller'),
       ('Glass blower/designer', 60000, 0.095, 'mueller-moore'),
       ('Print production planner', 197000, 0.095, 'humphrey-llc'),
       ('Psychologist, counselling', 180000, 0.008, 'perez-miller'),
       ('Meteorologist', 81000, 0.037, 'sellers-bryant'),
       ('Therapist, drama', 200000, 0.095, 'hall-mills'),
       ('Engineer, technical sales', 157000, 0.083, 'baker-santos'),
       ('Scientist, audiological', 61000, 0.095, 'foster-rice'),
       ('Dietitian', 198000, 0, 'ayala-buchanan'),
       ('Electrical engineer', 157000, NULL, 'jackson-davila-conley'),
       ('Agricultural consultant', 67000, NULL, 'moore-plc'),
       ('Geochemist', 104000, NULL, 'hudson-inc'),
       ('Geologist, engineering', 116000, NULL, 'jackson-davila-conley'),
       ('Clinical biochemist', 92000, NULL, 'norman-harvey'),
       ('Probation officer', 128000, NULL, 'foster-rice'),
       ('Chief Executive Officer', 83000, NULL, 'miller-woods-hernandez'),
       ('Surveyor, building', 144000, 0.007, 'salas-group'),
       ('Engineer, water', 165000, 0.010, 'ingram-ferguson-rubio'),
       ('Psychologist, counselling', 111000, 0.059, 'taylor-yu-lee'),
       ('Astronomer', 55000, 0.074, 'martinez-daniels'),
       ('Medical physicist', 110000, 0.015, 'mitchell-brown'),
       ('Chief Technology Officer', 64000, 0.067, 'robbins-marsh-martin'),
       ('Arboriculturist', 191000, 0.062, 'salas-group'),
       ('Conservation officer, nature', 108000, 0.006, 'jackson-davila-conley'),
       ('Psychologist, sport and exercise', 172000, 0.061, 'ayala-buchanan'),
       ('Designer, furniture', 149000, 0.041, 'mueller-moore'),
       ('Chartered loss adjuster', 72000, 0.084, 'davis-davis'),
       ('Producer, radio', 168000, 0.010, 'salas-group'),
       ('Operational investment banker', 200000, 0.022, 'smith-llc'),
       ('Surveyor, quantity', 72000, 0.071, 'mejia-scott-ryan'),
       ('Ship broker', 177000, 0, 'hall-davis'),
       ('Bookseller', 164000, 0, 'reynolds-greene'),
       ('Medical sales representative', 196000, 0, 'hall-mills'),
       ('Copy', 103000, 0, 'foster-rice'),
       ('Engineer, broadcasting (operations)', 86000, 0, 'baker-santos'),
       ('Fashion designer', 137000, 0, 'reynolds-greene'),
       ('Learning disability nurse', 66000, NULL, 'ayala-buchanan'),
       ('Research scientist (medical)', 175000, NULL, 'norman-harvey'),
       ('Accommodation manager', 126000, NULL, 'mejia-scott-ryan');

