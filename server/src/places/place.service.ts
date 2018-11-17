import { ListPlacesCriteria } from './model/list-places-criteria.model';
import { PlaceList } from './model/place-list.model';
import { CreatePlaceDto } from './model/create-place-dto.model';
import { UpdatePlaceDto } from './model/update-place-dto.model';
import { NotFoundException, Injectable } from '@nestjs/common';
import { Place } from './model/place.model';
import { PlaceRepository } from './place.repository';

@Injectable()
export class PlaceService {
  constructor(private readonly placeRepository: PlaceRepository) {}

  async getPlace(id: string): Promise<Place> {
    const place = await this.placeRepository.findById(id);

    if (place === undefined) {
      throw new NotFoundException();
    }

    return place;
  }

  async listPlaces(criteria: ListPlacesCriteria): Promise<PlaceList> {
    const total = await this.placeRepository.count(criteria);
    const items = await this.placeRepository.findAll(criteria);

    return new PlaceList(total, items);
  }

  async createPlace(data: CreatePlaceDto): Promise<Place> {
    const place = new Place({
      title: data.title,
      address: data.address,
    });

    await this.placeRepository.create(place);

    return place;
  }

  async updatePlace(id: string, update: UpdatePlaceDto): Promise<Place> {
    const place = await this.placeRepository.findById(id);

    if (place === undefined) {
      throw new NotFoundException();
    }

    Object.assign(place, {
      title: update.title || place.title,
      address: update.address || place.address,
    });

    return place;
  }

  async deletePlace(id: string): Promise<void> {
    const place = await this.placeRepository.findById(id);

    if (place === undefined) {
      throw new NotFoundException();
    }

    await this.placeRepository.remove(place);
  }
}
