const LOAD_START = 'loader/LOAD_START';
const LOAD_END = 'loader/LOAD_END';
const LOAD_SUCCESS = 'loader/LOAD_SUCCESS';
const LOAD_FAIL = 'loader/LOAD_FAIL';
const INPUT_CHANGE = 'loader/INPUT_CHANGE';
const INPUT_SUBMIT = 'loader/INPUT_SUBMIT';
const SET_DETAILS = 'loader/SET_DETAILS';

//actions

export const inputChange = inputValue => {
  return dispatch => {
    dispatch({
      type: INPUT_CHANGE,
      payload: inputValue
    });
  };
};

export const inputSubmit = () => {
  return dispatch => {
    dispatch({
      type: INPUT_SUBMIT
    });
  };
};

export const loadStart = () => {
  return dispatch => {
    dispatch({
      type: LOAD_START
    });
  };
};

export const loadEnd = () => {
  return dispatch => {
    dispatch({
      type: LOAD_END
    });
  };
};

export const loadSuccess = result => {
  return dispatch => {
    dispatch({
      type: LOAD_SUCCESS,
      payload: result
    });
  };
};

export const loadFail = err => {
  return dispatch => {
    dispatch({
      type: LOAD_FAIL,
      payload: err
    });
  };
};

export const setDetails = entryData => {
  return dispatch => {
    dispatch({
      type: SET_DETAILS,
      entryData
    });
  };
};

//reducer
const initialState = {
  loaded: false,
  loading: false,
  data: [],
  error: '',
  city: '',
  photo:
    'https://lh3.googleusercontent.com/p/AF1QipNthYlOY0N29y67i79LsDgpi_hXjF62KKMJKOi-=s1600-w1900',
  entryData: {
    address_components: [
      {
        long_name: '0309',
        short_name: '0309',
        types: ['street_number']
      },
      {
        long_name: 'Southwest Montgomery Street',
        short_name: 'SW Montgomery St',
        types: ['route']
      },
      {
        long_name: 'Downtown',
        short_name: 'Downtown',
        types: ['neighborhood', 'political']
      },
      {
        long_name: 'Portland',
        short_name: 'Portland',
        types: ['locality', 'political']
      },
      {
        long_name: 'Multnomah County',
        short_name: 'Multnomah County',
        types: ['administrative_area_level_2', 'political']
      },
      {
        long_name: 'Oregon',
        short_name: 'OR',
        types: ['administrative_area_level_1', 'political']
      },
      {
        long_name: 'United States',
        short_name: 'US',
        types: ['country', 'political']
      },
      {
        long_name: '97201',
        short_name: '97201',
        types: ['postal_code']
      },
      {
        long_name: '5125',
        short_name: '5125',
        types: ['postal_code_suffix']
      }
    ],
    adr_address:
      '<span class="street-address">0309 SW Montgomery St</span>, <span class="locality">Portland</span>, <span class="region">OR</span> <span class="postal-code">97201-5125</span>, <span class="country-name">USA</span>',
    formatted_address: '0309 SW Montgomery St, Portland, OR 97201, USA',
    formatted_phone_number: '(503) 220-1865',
    geometry: {
      location: {
        lat: 45.5094041,
        lng: -122.6733278
      },
      viewport: {
        northeast: {
          lat: 45.5107150802915,
          lng: -122.6720901197085
        },
        southwest: {
          lat: 45.5080171197085,
          lng: -122.6747880802915
        }
      }
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png',
    id: 'a434678a2e3ed61436cd601c3d36be3876324726',
    international_phone_number: '+1 503-220-1865',
    name: "McCormick & Schmick's Harborside at the Marina",
    opening_hours: {
      open_now: true,
      periods: [
        {
          close: {
            day: 0,
            time: '2200'
          },
          open: {
            day: 0,
            time: '1130'
          }
        },
        {
          close: {
            day: 1,
            time: '2200'
          },
          open: {
            day: 1,
            time: '1130'
          }
        },
        {
          close: {
            day: 2,
            time: '2200'
          },
          open: {
            day: 2,
            time: '1130'
          }
        },
        {
          close: {
            day: 3,
            time: '2200'
          },
          open: {
            day: 3,
            time: '1130'
          }
        },
        {
          close: {
            day: 4,
            time: '2200'
          },
          open: {
            day: 4,
            time: '1130'
          }
        },
        {
          close: {
            day: 5,
            time: '2300'
          },
          open: {
            day: 5,
            time: '1130'
          }
        },
        {
          close: {
            day: 6,
            time: '2300'
          },
          open: {
            day: 6,
            time: '1130'
          }
        }
      ],
      weekday_text: [
        'Monday: 11:30 AM – 10:00 PM',
        'Tuesday: 11:30 AM – 10:00 PM',
        'Wednesday: 11:30 AM – 10:00 PM',
        'Thursday: 11:30 AM – 10:00 PM',
        'Friday: 11:30 AM – 11:00 PM',
        'Saturday: 11:30 AM – 11:00 PM',
        'Sunday: 11:30 AM – 10:00 PM'
      ]
    },
    photos: [
      {
        height: 498,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110663480997904272874/photos">McCormick &amp; Schmick&#39;s Harborside at the Marina</a>'
        ],
        photo_reference:
          'CmRaAAAAIKcg2EJ3d4CWjG7hvUuMS4J48yL1glatwG6x_Tu6Bnk_Ka16MFNsaVME4gz2j66scorD0iotTO1TZHNw_a-uWqaHRH-UCQ6l6OLvSqNKqmn0F8wB7grO-xwx5uFBf8FwEhAbiIssEep72mDsjP8RRfJ9GhSuZXygaVy1ZQx7WKqMygn3LiwPIw',
        width: 886
      },
      {
        height: 647,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110663480997904272874/photos">McCormick &amp; Schmick&#39;s Harborside at the Marina</a>'
        ],
        photo_reference:
          'CmRaAAAAmZIEjMlj1Q56NojfJ1ABDLRnetwUpAHX5Y-PGDtBUqN8eHLxkTVN8VyAsKZLPBWOYzmMZqF4NvqnftwmybY3GMxUICks9Zzg1i39IgbinoC36EF9rTfJF6pprpJIZKchEhDAtKz9TDKTXmhPG_aqdR9zGhRmVPqM1-fNwplbqVIOsteX8sYrVw',
        width: 864
      },
      {
        height: 2322,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102764096013780300184/photos">Roger Asher</a>'
        ],
        photo_reference:
          'CmRaAAAA4g1epDV2L_10KEZ5SRvgOFCJku9aMoT0Xp3OhoKwz-UBZEv3HOWpnQEuwLY9pm4wXL34gfE3Pue1Vr1_packozHUuq8tj9sru0QzU2vHi3mI-odbGfqDAaLW0CZdU4rMEhBMan8xfswnfRB20ZYa1OmMGhScNw-MBmhK3Odfdbi7fvueu72gBw',
        width: 4128
      },
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/103836666234982386443/photos">Clay J.</a>'
        ],
        photo_reference:
          'CmRaAAAAvaaqBiQXPZvP4KYy-PiIRL912V-gYNng5RZ3TU0mua25SNh9K9rvr0cgX1KUrfIFTnl7jmLW907aLJY4w8VNER6S65Kq7vOOiwpNEQuoZfmIG8zi4kseAFmty3qCRDTBEhDGIdHA5-NFOmviji-gUu9IGhTvb4_M_Sf0bAzNi0EnXjOmpVq0qQ',
        width: 3024
      },
      {
        height: 748,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110663480997904272874/photos">McCormick &amp; Schmick&#39;s Harborside at the Marina</a>'
        ],
        photo_reference:
          'CmRaAAAAsXE5izHaceRh8OHTBSRWFjqQoIC23GDe-uVhtReG1BKQPkAw2qTv9z4P7OiwyizPZUgYJLP5-qqFJ_V3JfsuNeLuCibUHGsm9rhf3g_sSJlY2XX2ZgxI519JHbzKOPNxEhBwP1LM58O2skHzpp8n9LkNGhSYFniZnuJ8wt7yVOBSPtaS4VI_7Q',
        width: 1000
      },
      {
        height: 2988,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/108636241796938596715/photos">cai boxiu</a>'
        ],
        photo_reference:
          'CmRaAAAAkOIzByL5AKhJcmaQhwoIG86lpt2AC9uHympYVOwZijaz8cp3mrtL8cCV-Ix18Tr60NUobX0kjcQOxRIEJ47nWc2K75Q1_n1Qqnm-GT5PV-vMY3A5WnKIarpdGt_5b1e4EhBijaRl3w93YZLxUSCGYb7zGhQKtseb7K0o9YBExPymLY3KfdgTvw',
        width: 5312
      },
      {
        height: 3326,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110663480997904272874/photos">McCormick &amp; Schmick&#39;s Harborside at the Marina</a>'
        ],
        photo_reference:
          'CmRaAAAAElmsMbxxuYUY-eC7iReYj_pzGe9hEnl8wkr2ENHmh7QcXYovLgz6eeDYIn0m2jDPl6UGY-4-2jZIig7Z3Z_aKRZbzWkg2J_IjkrCxtHIfWR55lpLZqLEC-aIa_IAhgXgEhDJsJ1M-ROANQbMhK1X1o6hGhRtP9I2EdB2C0vN0ODbuyciLZiaeQ',
        width: 4597
      },
      {
        height: 1836,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/101250594334942462192/photos">Mike Ingrassia</a>'
        ],
        photo_reference:
          'CmRaAAAAsw4y36hyhTQ8HNryS6_dzjv3n64L3YLBIJvtoezQrltBIHccvg9f56KWamJxDvHAmzgnSr-75ZbD3yir1o8YNFIIxJ7sZE8HofMU5eHHzDIDd4ruDJEyy1wBzhv-0-6LEhB4ZIYPEha3dEBd3aqTdcHWGhQ-pxlxTfGJjfkxQXm8ZjIcg6rDyw',
        width: 3264
      },
      {
        height: 2988,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110439485760477290405/photos">Sasha Hartleb</a>'
        ],
        photo_reference:
          'CmRaAAAAJKDd_k0PzxKRJYOrV-Od_3ASBw0tWPfHHOSpeYo-QEVIkYSqu7kaURIypi44vjxYMiRpGAusWp0pRM85ocU8O6HfTNSLl_VjWcil7daE4tO4hi9J7vTmIj-te8LSIZI9EhDW24u5r3PzJASXuG8geCvdGhQ70GMDDWsXm4qQWG3CbFoy8aCMyw',
        width: 5312
      },
      {
        height: 1179,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110663480997904272874/photos">McCormick &amp; Schmick&#39;s Harborside at the Marina</a>'
        ],
        photo_reference:
          'CmRaAAAANkECbdAnuP4Atln6cPzEAH-ZXDsXXrlU0_-abboH_wSdLFiCh8_Aote5mTfjMXF8wI1fr6BQ8GwVvq9Nrwp6V9el4y7dXeixhSzQ0jVA68HRgZMh0k5q5imhSMJRWE-nEhDS4cNN6gZDoD34kdrpc5DNGhQMjym_J2OY1R24aWeQU4I23CPDsA',
        width: 1766
      }
    ],
    place_id: 'ChIJ90LS6BIKlVQRFACyLeXayLY',
    price_level: 2,
    rating: 4,
    reference:
      'CmRSAAAA9lQrFKKn6Gw1L9dH3K9wiBZ41OdbGyXKnhBObfkAHKWFAgV-IAMm6cq6KWCN_2PRBgt-Jvd6ZJPFWMBtlr2oUpFAPn8mTYrym4uU14AZVYWRCSoJOcWoneZ9JspzdigVEhBZmye6tBkujPKJl2q1n6xoGhRUr4M9fON7_xgz_iUDcjr6BXq2JQ',
    reviews: [
      {
        author_name: 'Sam DeLiso',
        author_url:
          'https://www.google.com/maps/contrib/111489437773180221747/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh6.googleusercontent.com/-y-SW_EcNHBg/AAAAAAAAAAI/AAAAAAAAIao/_2Mp7PTWxnU/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg',
        rating: 4,
        relative_time_description: 'in the last week',
        text:
          "Can't beat the view of this particular location right on the Willamette River, located off McCall Waterfront Park... $3 Bloody Mary's & Mimosas during weekend brunch was what drew us in .. then I was pleasantly surprised by their decently priced bisquit & gravy, which definitely had a unique consistency and above average flavor. Chop Salad was also pretty darn good for a chain restaurant like this. Location, location, location....and cheap brunch beverages! Server was friendly too despite the wait for service in what seemed like a very slow breakfast hour. Thanks, will definitely return some weekend!\n\nBest,\n~S",
        time: 1521928675
      },
      {
        author_name: 'Glen D',
        author_url:
          'https://www.google.com/maps/contrib/102294216739144508235/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh4.googleusercontent.com/-kERxc51Aonk/AAAAAAAAAAI/AAAAAAAAAAA/ACLGyWB0hQCTefuYjmMlo5bKpaMf0lxxfw/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg',
        rating: 3,
        relative_time_description: '2 weeks ago',
        text:
          "Good food, poor customer service.  They wouldn't seat us 2 tables away when the restaurant was empty cause that section 'wasn't open yet' so they crowded everone together  to make it easier for the servers and it was really loud and rather obnoxious of them.  We ate in the bar instead.  It's easy to see why you can ALWAYS get a reservation here where the popular places are always booked, and when you look at what a FANTASTIC location it is, you know they must be doing something wrong.  The happy hour food and appetizers and drinks were very enjoyable, and the bar staff was in general much more accomodating",
        time: 1521058959
      },
      {
        author_name: 'Mike Venegas',
        author_url:
          'https://www.google.com/maps/contrib/100706604104995239442/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh6.googleusercontent.com/-giRO_s_935w/AAAAAAAAAAI/AAAAAAAAAAA/ACLGyWDX2V5m_zi7KtIBXeIen9cYCdWFAQ/s128-c0x00000000-cc-rp-mo/photo.jpg',
        rating: 5,
        relative_time_description: '2 months ago',
        text:
          'McCormick has become my home away from home.  The team is more than friends. They truly care therefore becoming family. The food is above average,  and happy hour is within any budget and so tasty. In my book,  5 star plus. Bravo!!! McCormick team.',
        time: 1516513340
      },
      {
        author_name: 'Ross Wilson',
        author_url:
          'https://www.google.com/maps/contrib/115511618217970857507/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh6.googleusercontent.com/-eVKtbKy3sO4/AAAAAAAAAAI/AAAAAAAAEdo/TukXaMl-8iM/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg',
        rating: 5,
        relative_time_description: 'in the last week',
        text:
          "McCormick and Schmick's is located along the walkway overlooking the Willamette River. The dining experience is Grand, as every seat has a view of the river, the staff are all well trained , and the food is of the highest quality. The menu is varied, but all seafood based.",
        time: 1521773490
      },
      {
        author_name: 'Connor Anderson',
        author_url:
          'https://www.google.com/maps/contrib/102389019299727749000/reviews',
        language: 'en',
        profile_photo_url:
          'https://lh4.googleusercontent.com/-A-dNsYzke2g/AAAAAAAAAAI/AAAAAAAAAKE/hCD6QIMqIKU/s128-c0x00000000-cc-rp-mo/photo.jpg',
        rating: 3,
        relative_time_description: '3 weeks ago',
        text:
          'The positive is that the staff are attentive and helpful.  However, the food is just, "meh." Both my appetizer. shrimp and crab cake, and my signature Scottish salmon were undercooked.  The appetizer was straight up cold in the middle and I sent it back.  I thought the salmon with a beet reduction might be interesting, and it was different.  But the fish was not cooked through and just barely warm in the center.  Which some may like, but I feel is a failure to cook the fish properly.\n\nThe atmosphere is kind of weird too.  Warm wood accented with what I would call "hotel abstract" art.  The music was a mix of 70\'s and 80\'s good music played at such a low volume as to be almost elevator music.  At one point, I detected the Clash\'s "Police and Thieves," which, okay.  But really, at dinner.\n\nI guess it\'s fine for drinks and nibbles by the marina.  But if you want quality seafood, just go to Jakes, who own the place.',
        time: 1520111121
      }
    ],
    scope: 'GOOGLE',
    types: ['restaurant', 'bar', 'food', 'point_of_interest', 'establishment'],
    url: 'https://maps.google.com/?cid=13171017788094021652',
    utc_offset: -420,
    vicinity: '0309 Southwest Montgomery Street, Portland',
    website:
      'http://www.mccormickandschmicks.com/locations/portland-oregon/portland-oregon/swmontgomery.aspx?utm_campaign=Yext&utm_source=Yext&utm_medium=Website&utm_content=MSPO',
    photo:
      '"https://lh3.googleusercontent.com/p/AF1QipOQbcineJX86A-RrYfNgI-aBHEmtFG8BizjdMaE=s1600-w886"'
  }
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        city: action.payload
      };
    case INPUT_SUBMIT:
      return {
        ...state,
        loading: true
      };
    case LOAD_START:
      return {
        ...state,
        loading: true
      };
    case LOAD_END:
      return {
        ...state,
        loading: false
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.payload,
        error: ''
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: [],
        error: action.payload
      };
    case SET_DETAILS:
      return {
        ...state,
        entryData: action.entryData
      };
    default:
      return state;
  }
};
