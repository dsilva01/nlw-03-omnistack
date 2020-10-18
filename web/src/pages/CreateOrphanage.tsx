import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory } from "react-router-dom";

import { FiPlus } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import mapIcon from "../util/mapIcon";
import api from "../services/api";

import xCircleImg from '../assets/icons/x-circle.svg';

import '../styles/pages/create-orphanage.css';

export default function CreateOrphanage() {
  const history = useHistory();

  const [myPosition, setMyPosition] = useState({latitude: 0, longitude: 0});
  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  useEffect(() => {
    let latitude;
    let longitude;
    navigator.geolocation.getCurrentPosition((position)=> {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      setMyPosition({latitude, longitude});
      setPosition({latitude, longitude});
    });
  }, []);
  
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    
    setPosition({
      latitude: lat,
      longitude: lng
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    
    images.forEach(image => {
      data.append('images', image);
    });

    await api.post('orphanages', data);

    alert('Cadastro com sucesso');

    history.push('/app');

    console.log(open_on_weekends);
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    images.map( image => selectedImages.unshift(image));

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  function handleRemoveImage(index: number) {
    let selectedImages = images.filter(image => image !== images[index]);
    let selectedImagesPreview = previewImages.filter(image => image !== previewImages[index]);

    setImages(selectedImages);
    setPreviewImages(selectedImagesPreview);

    console.log(`${images}||${previewImages}`);
  }
  
  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form" autoComplete="off">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[myPosition.latitude, myPosition.longitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {position.latitude !== 0 &&
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              }
              {/**/}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image, index) => {
                  return (
                    <div key={image} className="remove-image" id="abc">
                    <img src={image} alt={name} className="new-images" />
                      {<button
                      type="button"
                      onClick={(event) => {
                        handleRemoveImage(index)
                      }}
                      >
                      <img src={xCircleImg} alt={name} className="remove" />
                      </button>}
                      
                      </div>
                  );
                })}

                {/*<img src={testImg} alt="assa" />
                <div className="remove-inmage">
                  <button type="button" id="remove" >
                    <img src={xCircleImg} />
                  </button>
              </div>*/}

              <label htmlFor="images[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
              </div>

              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="images[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => { setOpenOnWeekends(false)}}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
