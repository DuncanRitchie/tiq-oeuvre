# Duncan’s œuvre with Theatre in the Quarter and related groups

<i>Links in this readme go to the &oelig;uvre.</i>

I've been volunteering with Theatre in the Quarter for several years now, in particular for the three children’s drama-groups they run in my hometown of Chester ([Jigsaw](https://www.duncanritchie.co.uk/tiq-oeuvre/?troupe=jigsaw-music-theatre), [Quartz](https://www.duncanritchie.co.uk/tiq-oeuvre/?troupe=quartz-youth-theatre), and [Rewind](https://www.duncanritchie.co.uk/tiq-oeuvre/?troupe=rewind-youth-theatre)). I design [posters](https://www.duncanritchie.co.uk/tiq-oeuvre/?role=poster-designer) and [programmes](https://www.duncanritchie.co.uk/tiq-oeuvre/?role=programme-designer), write [lyrics](https://www.duncanritchie.co.uk/tiq-oeuvre/?role=lyricist), take [photos](https://www.duncanritchie.co.uk/tiq-oeuvre/?role=photographer), and generally help to [supervise and direct](https://www.duncanritchie.co.uk/tiq-oeuvre/?role=assistant-director) the kids.

Here I've documented what I've done for them. I also include posters I’ve done for the women’s choir [A Handbag of Harmonies](https://www.duncanritchie.co.uk/tiq-oeuvre/?role=poster-designer&troupe=handbag-of-harmonies) and photography for the mini-festival [Chester International Music Week](https://www.duncanritchie.co.uk/tiq-oeuvre/?slug=chester-international-music-week). Furthermore, because I was a member of Jigsaw for much of my childhood before I started volunteering with them, [those plays](https://www.duncanritchie.co.uk/tiq-oeuvre/?role=actor&troupe=jigsaw-music-theatre) are also listed.

It’s a static React page. The data, in Json format, have been output by an Excel spreadsheet I have privately. I refresh the data when I notice a typo or there’s a new play for me to add.

Productions can be filtered by clicking on values such as the name of the troupe or the year of performance; this uses query strings with React Router. You can combine filters by changing the URL yourself: [?role=poster-designer&year=2019&year=2020](https://www.duncanritchie.co.uk/tiq-oeuvre/?role=poster-designer&year=2019&year=2020) yields posters I designed in the year 2019 or 2020.

I use Cloudinary to serve my images, GitHub Pages to host the page itself, and react-lazy-load to improve performance.

www.duncanritchie.co.uk/tiq-oeuvre
